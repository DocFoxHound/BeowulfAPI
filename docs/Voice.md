# Voice Signaling and Low-Res Audio

This project now includes a lightweight Socket.IO-powered signaling server under the namespace `/voice` for real-time, low-latency voice between clients. It supports two patterns:

- WebRTC peer-to-peer (recommended): Server relays SDP/ICE only. Audio flows P2P with built-in Opus encoding.
- Simple chunk relay: For quick prototyping, clients can emit small, low-bitrate voice chunks (e.g., Opus or PCM) that are broadcast to other clients in the room. This is higher latency and not as robust as WebRTC.

## Server

- Namespace: `/voice`
- Events:
  - `join-room` → `{ roomId }`
    - Joins a room and receives `peers` (array of socket IDs) for existing participants
    - Other peers receive `peer-joined`
  - `signal` → `{ target, data }`
    - Relay for WebRTC signaling data (SDP offers/answers and ICE candidates)
    - The server emits `signal` to the `target` with `{ from, data }`
  - `voice-chunk` → `{ roomId, chunk }`
    - Broadcasts a small audio chunk to other peers in the same room
  - `leave-room`
    - Leaves the current room; others receive `peer-left`

CORS for Socket.IO uses the same URL origins as the REST API, derived from env variables:

- `IS_LIVE` ("true"/"false")
- `LIVE_FRONTEND_URL`
- `LIVE_FRONTEND_URL_SHORT`
- `TEST_FRONTEND_URL`

## Client: WebRTC example (recommended)

```js
import io from 'socket.io-client';

const socket = io(`${API_BASE_URL}/voice`, {
  withCredentials: true,
  transports: ['websocket']
});

const peers = new Map(); // socketId -> RTCPeerConnection
let localStream;

async function start(roomId) {
  localStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      channelCount: 1,
      sampleRate: 16000, // hint to reduce bitrate
      noiseSuppression: true,
      echoCancellation: true,
      autoGainControl: true
    },
    video: false
  });

  socket.emit('join-room', { roomId });
}

socket.on('peers', async (ids) => {
  for (const id of ids) {
    await createAndCallPeer(id, true);
  }
});

socket.on('peer-joined', async (id) => {
  await createAndCallPeer(id, true);
});

socket.on('peer-left', (id) => {
  const pc = peers.get(id);
  if (pc) pc.close();
  peers.delete(id);
});

socket.on('signal', async ({ from, data }) => {
  let pc = peers.get(from);
  if (!pc) pc = await createPeer(from, false);

  if (data.sdp) {
    await pc.setRemoteDescription(data.sdp);
    if (data.sdp.type === 'offer') {
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('signal', { target: from, data: { sdp: pc.localDescription } });
    }
  } else if (data.candidate) {
    try { await pc.addIceCandidate(data.candidate); } catch {}
  }
});

async function createPeer(id, isInitiator) {
  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
      // For production, add your TURN server here
    ]
  });

  peers.set(id, pc);

  // Send local audio
  for (const track of localStream.getTracks()) {
    pc.addTrack(track, localStream);
  }

  // Receive audio
  pc.ontrack = (e) => {
    const audio = document.createElement('audio');
    audio.autoplay = true;
    audio.srcObject = e.streams[0];
    document.body.appendChild(audio);
  };

  pc.onicecandidate = (e) => {
    if (e.candidate) socket.emit('signal', { target: id, data: { candidate: e.candidate } });
  };

  if (isInitiator) {
    const offer = await pc.createOffer({ offerToReceiveAudio: true, voiceActivityDetection: true });
    await pc.setLocalDescription(offer);
    socket.emit('signal', { target: id, data: { sdp: pc.localDescription } });
  }

  return pc;
}

async function createAndCallPeer(id, isInitiator) {
  const pc = await createPeer(id, isInitiator);
  return pc;
}
```

## Client: simple chunk relay (optional)

This is a quick demo path if you don't want to do WebRTC yet. It has higher latency and less resilience.

```js
import io from 'socket.io-client';
const socket = io(`${API_BASE_URL}/voice`, { transports: ['websocket'] });

async function start(roomId) {
  socket.emit('join-room', { roomId });
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

  // Use MediaRecorder with short timeslice to get small chunks (Opus in Ogg or WebM)
  const rec = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
  rec.ondataavailable = async (e) => {
    if (e.data && e.data.size) {
      const buf = Buffer.from(await e.data.arrayBuffer());
      if (buf.length <= 8192) {
        socket.emit('voice-chunk', { roomId, chunk: buf });
      }
    }
  };
  rec.start(100); // 100ms chunks
}

socket.on('voice-chunk', ({ from, chunk }) => {
  const blob = new Blob([chunk], { type: 'audio/webm;codecs=opus' });
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.play();
});
```

## Notes
- For production, deploy a TURN server to ensure connectivity behind NAT/firewalls and use it in the `iceServers` list.
- Consider authentication and authorization at the Socket.IO handshake to restrict who can join which rooms.
- The server enforces a simple chunk-size limit (8KB) for `voice-chunk`. Tune as needed.
- WebRTC is strongly recommended for low-latency, scalable voice.
