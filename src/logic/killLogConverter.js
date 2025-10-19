const KeyModel = require('../models/keyModel');
const UserModel = require('../models/userModel');
const ShipModel = require('../models/uexShipModel');
const BlackBox = require('../models/blackBoxModel');
const stringSimilarity = require('string-similarity');
const crypto = require('crypto'); // Add this at the top if not already imported

async function killLogConvert(reportKill){
    try{
        const global_ship_list = [
            'DRAK', 'ORIG', 'AEGS', 'ANVL', 'CRUS', 'BANU', 'MISC',
            'KRIG', 'XNAA', 'ARGO', 'VNCL', 'ESPR', 'RSI', 'CNOU',
            'GRIN', 'TMBL', 'GAMA', 'GLSN'
        ]

        const fps_weapons = [
            '_rifle_', '_pistol_', '_shotgun_', '_smg_', '_sniper_', '_sniperrifle_', '_grenade_', '_launcher_', '_lmg_', '_melee_', '_special_', 'unknown'
        ]

        // Replace this line:
        // const id = reportKill.id;

        // With this: build ID from the reportKill.time (ms epoch) and randomize the last 2 digits
        // to reduce collision risk when multiple kills occur in the same millisecond.
        // Falls back to Date.now() if reportKill.time is missing or invalid.
        // Also sanitize time strings like "<2025-04-14T17:10:51.498Z>" by stripping angle brackets.
        let timeMs = Date.now();
        let timestampIso = new Date(timeMs).toISOString();
        if (reportKill.time) {
            const cleanedTime = String(reportKill.time).replace(/[<>]/g, '');
            const parsed = Date.parse(cleanedTime);
            if (!Number.isNaN(parsed)) {
                timeMs = parsed;
                timestampIso = new Date(parsed).toISOString();
            }
        }
        const baseMs = BigInt(timeMs);
        // Zero-out the last two digits and replace them with a random 00-99 suffix
        const id = baseMs - (baseMs % 100n) + BigInt(crypto.randomInt(0, 100));

    // Backward-compatible safe defaults for possibly missing fields
    const patch = reportKill.patch || null;
    const timestamp = timestampIso;
    const gameModeRaw = typeof reportKill.game_mode === 'string' ? reportKill.game_mode : '';
    const victim = typeof reportKill.victim === 'string' ? reportKill.victim : 'unknown';
    const zone = typeof reportKill.zone === 'string' ? reportKill.zone : '';
    const weapon = typeof reportKill.weapon === 'string' ? reportKill.weapon : 'unknown';
    const location = typeof reportKill.location === 'string' ? reportKill.location : null;
    const coordinates = typeof reportKill.coordinates === 'string' ? reportKill.coordinates : null;
    const containsFpsWeapon = weapon ? fps_weapons.some(gun => weapon.includes(gun)) : false;
    const startsWithGlobalShip = zone ? global_ship_list.some(prefix => zone.startsWith(prefix)) : false;
        // const rsi_profile = reportKill.rsi_profile;
        // const game_mode = reportKill.game_mode;
        // const client_ver = reportKill.client_ver;
        let playerShip = typeof reportKill.killers_ship === 'string' ? reportKill.killers_ship : 'N/A';
        const key = reportKill.key;
        const keyUserPair = await KeyModel.findOne({
            where: {
                key: key
            }
        });
        if (!keyUserPair) {
            console.warn('killLogConvert: No user found for key; skipping BlackBox creation');
            return;
        }
        const userId = keyUserPair.user_id;
        const damageType = reportKill.damage_type;
        // const userData = await UserModel.findByPk(userId);
        const allShips = (await ShipModel.findAll()).map(ship => ship.get());
        const shipNames = allShips.map(s => s.ship);
        const normalizedShipNames = shipNames.map(normalizeShipName);
        const SIMILARITY_THRESHOLD = 0.8

        let gameMode
        if(gameModeRaw.includes("EA")){
            gameMode = "AC";
        }else{
            gameMode = "PU";
        }

        let matchedKilledShipObject = "FPS";
        if(damageType === "VehicleDestruction" || damageType === "Explosion" || damageType === "Crash" && startsWithGlobalShip && !containsFpsWeapon){
            try{
                let killedShip = zone.slice(5, -14).replace(/_/g, ' ');
                const normalizedKilled = normalizeShipName(killedShip);

                // 1. Exact match first
                const exactIdx = normalizedShipNames.indexOf(normalizedKilled);
                if (exactIdx !== -1) {
                    const bestKilledMatchName = shipNames[exactIdx];
                    matchedKilledShipObject = allShips.find(ship => ship.ship === bestKilledMatchName);
                } else {
                    // 2. Fuzzy match, but prefer shortest and/or prefix matches on tie
                    const matchKilled = stringSimilarity.findBestMatch(normalizedKilled, normalizedShipNames);
                    const bestScore = matchKilled.bestMatch.rating;

                    // Find all matches with the best score
                    const bestMatches = matchKilled.ratings
                        .map((r, i) => ({ ...r, index: i }))
                        .filter(r => r.rating === bestScore && bestScore >= SIMILARITY_THRESHOLD);

                    let chosenIdx;
                    if (bestMatches.length > 1) {
                        // Prefer exact prefix match, then shortest name, then first
                        const prefixIdx = bestMatches.find(m => normalizedShipNames[m.index].startsWith(normalizedKilled));
                        if (prefixIdx) {
                            chosenIdx = prefixIdx.index;
                        } else {
                            // Prefer shortest name
                            chosenIdx = bestMatches.reduce((minIdx, curr) =>
                                shipNames[curr.index].length < shipNames[minIdx].length ? curr.index : minIdx,
                                bestMatches[0].index
                            );
                        }
                    } else if (bestMatches.length === 1) {
                        chosenIdx = bestMatches[0].index;
                    }

                    if (chosenIdx !== undefined) {
                        const bestKilledMatchName = shipNames[chosenIdx];
                        matchedKilledShipObject = allShips.find(ship => ship.ship === bestKilledMatchName);
                    } else {
                        matchedKilledShipObject = "unknown";
                    }
                }

                //ORIGINAL
                // const matchKilled = stringSimilarity.findBestMatch(normalizedKilled, normalizedShipNames);
                // const bestKilledMatchName = shipNames[normalizedShipNames.indexOf(matchKilled.bestMatch.target)];
                // matchedKilledShipObject = allShips.find(ship => ship.ship === bestKilledMatchName);
                
                // if (matchKilled.bestMatch.rating >= SIMILARITY_THRESHOLD) {
                //     const bestKilledMatchName = shipNames[normalizedShipNames.indexOf(matchKilled.bestMatch.target)];
                //     matchedKilledShipObject = allShips.find(ship => ship.ship === bestKilledMatchName);
                // } else {
                //     matchedKilledShipObject = "unknown";
                // }
            } catch (error) {
                console.error("Error matching killed ship: ", error.message);
            }
        }else if (containsFpsWeapon){
            matchedKilledShipObject = "FPS";
        }else{
            matchedKilledShipObject = "unknown";
        }
        

        let matchedPlayerShipObject = "unknown";
        if(playerShip && playerShip !== "N/A"){
            try{
                playerShip = playerShip.slice(5, -14).replace(/_/g, ' ');
                const normalizedPlayerShip = normalizeShipName(playerShip);
                const matchPlayer = stringSimilarity.findBestMatch(normalizedPlayerShip, normalizedShipNames);
                const bestPlayerMatchName = shipNames[normalizedShipNames.indexOf(matchPlayer.bestMatch.target)];
                matchedPlayerShipObject = allShips.find(ship => ship.ship === bestPlayerMatchName);
                // console.log("matchedPlayerShipObject: ", matchedPlayerShipObject);
            }catch (error) {
                console.error("Error matching player ship: ", error.message);
            }
        }

        const newBlackBox = new BlackBox({
            id: id,
            user_id: userId,
            ship_used: matchedPlayerShipObject !== "unknown" ? matchedPlayerShipObject.ship : "unknown",
            ship_killed: matchedKilledShipObject !== "FPS" ? matchedKilledShipObject.ship : "FPS",
            value: matchedKilledShipObject !== "FPS" ? matchedKilledShipObject.avg_price : 0,
            kill_count: 1,
            victims: [victim],
            patch: patch,
            game_mode: gameMode,
            timestamp: timestamp,
            location: location,
            coordinates: coordinates
        });
        const savedBlackBox = await newBlackBox.save();
        console.log("Saved")

    } catch (error) {
        console.error("Error in killLogConvert: ", error.message);
    }
}


function normalizeShipName(name) {
    return name
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\bmk1\b/gi, 'mk i')       // replace mk2 → mk ii
        .replace(/\bmk2\b/gi, 'mk ii')       // replace mk2 → mk ii
        .replace(/\bmk3\b/gi, 'mk iii')      // optional extras
        .replace(/\bmk4\b/gi, 'mk iv')      // optional extras
        .replace(/\bmk5\b/gi, 'mk v')      // optional extras
        .replace(/\bmk 1\b/gi, 'mk i')       // replace mk2 → mk ii
        .replace(/\bmk 2\b/gi, 'mk ii')       // replace mk2 → mk ii
        .replace(/\bmk 3\b/gi, 'mk iii')      // optional extras
        .replace(/\bmk 4\b/gi, 'mk iv')      // optional extras
        .replace(/\bmk 5\b/gi, 'mk v')
        .replace(/[^a-z0-9 ]/gi, '')          // remove special chars
        .trim();
}

module.exports = {
    killLogConvert
};

// {
//     id: '1744564671305',
//     patch: '4.1',
//     time: 2025-04-13T17:17:51.279Z,
//     player: 'DocHound',
//     victim: 'Mercuriuss',
//     zone: 'ANVL_Hornet_F7A_Mk2_2677329226210',
//     weapon: 'GATS_BallisticGatling_S3_2677329225797',
//     rsi_profile: 'https://robertsspaceindustries.com/citizens/Mercuriuss',
//     game_mode: 'EA_SquadronBattle',
//     client_ver: '7.0',
//     killers_ship: 'N/A',
//     key: '1744564671305',
//   },

// {
//     id: '1744649023808',
//     patch: '4.1',
//     time: 2025-04-14T16:43:43.226Z,
//     player: 'DocHound',
//     victim: 'CaptainComedy',
//     zone: 'OOC_Stanton_2a_Cellin',
//     weapon: 'unknown',
//     rsi_profile: 'https://robertsspaceindustries.com/citizens/CaptainComedy',
//     game_mode: 'EA_FPSGunGame',
//     client_ver: '7.0',
//     killers_ship: 'N/A',
//     key: '82d2d7a4f738c905db556f6cd904e8c3'
//   }

// { this is a turret
//     id: '1744650651701',
//     patch: '4.1',
//     time: 2025-04-14T17:10:51.498Z,
//     player: 'DocHound',
//     victim: 'Mercuriuss',
//     zone: 'ANVL_Hornet_F7A_Mk2_2699085238610',
//     weapon: 'RSI_Bespoke_BallisticCannon_A_2699085238957',
//     rsi_profile: 'https://robertsspaceindustries.com/citizens/Mercuriuss',
//     game_mode: 'EA_FreeFlight',
//     client_ver: '7.0',
//     killers_ship: 'N/A',
//     key: '82d2d7a4f738c905db556f6cd904e8c3'
//   }

// {
//     id: '1744650979279',
//     patch: '4.1',
//     time: 2025-04-14T17:16:18.806Z,
//     player: 'DocHound',
//     victim: 'Mercuriuss',
//     zone: 'ANVL_Hornet_F7A_Mk2_2699085240659',
//     weapon: 'MRCK_S10_RSI_Polaris_Torpedo_lb_2699085238828',
//     rsi_profile: 'https://robertsspaceindustries.com/citizens/Mercuriuss',
//     game_mode: 'EA_FreeFlight',
//     client_ver: '7.0',
//     killers_ship: 'N/A',
//     key: '82d2d7a4f738c905db556f6cd904e8c3'
//   }

// {
//     id: '1744653304646',
//     patch: '4.1',
//     time: 2025-04-14T17:55:02.880Z,
//     player: 'DocHound',
//     victim: 'Mercuriuss',
//     zone: 'planet',
//     weapon: 'klwe_lmg_energy_01_2699725233488',
//     rsi_profile: 'https://robertsspaceindustries.com/citizens/Mercuriuss',
//     game_mode: 'EA_FPSGunGame',
//     client_ver: '7.0',
//     killers_ship: 'N/A',
//     key: '82d2d7a4f738c905db556f6cd904e8c3'
//   }

// {
//     id: '1744653411989',
//     patch: '4.1',
//     time: 2025-04-14T17:56:51.076Z,
//     player: 'DocHound',
//     victim: 'Mercuriuss',
//     zone: 'planet',
//     weapon: 'utfl_melee_01_gungame_2699725233463',
//     rsi_profile: 'https://robertsspaceindustries.com/citizens/Mercuriuss',
//     game_mode: 'EA_FPSGunGame',
//     client_ver: '7.0',
//     killers_ship: 'N/A',
//     key: '82d2d7a4f738c905db556f6cd904e8c3'
//   }

// {
//     id: '1744653572428',
//     patch: '4.1',
//     time: 2025-04-14T17:59:31.952Z,
//     player: 'DocHound',
//     victim: 'Mercuriuss',
//     zone: 'planet',
//     weapon: 'gmni_rifle_ballistic_01_firerats01_2699725233533',
//     rsi_profile: 'https://robertsspaceindustries.com/citizens/Mercuriuss',
//     game_mode: 'EA_FPSGunGame',
//     client_ver: '7.0',
//     killers_ship: 'N/A',
//     key: '82d2d7a4f738c905db556f6cd904e8c3'
//   }

// {
//     id: '1744653805773',
//     patch: '4.1',
//     time: 2025-04-14T18:03:24.713Z,
//     player: 'DocHound',
//     victim: 'Mercuriuss',
//     zone: 'planet',
//     weapon: 'none_shotgun_ballistic_01_2699725233627',
//     rsi_profile: 'https://robertsspaceindustries.com/citizens/Mercuriuss',
//     game_mode: 'EA_FPSGunGame',
//     client_ver: '7.0',
//     killers_ship: 'N/A',
//     key: '82d2d7a4f738c905db556f6cd904e8c3'
//   }

// {
//     id: '1744653880625',
//     patch: '4.1',
//     time: 2025-04-14T18:04:40.256Z,
//     player: 'DocHound',
//     victim: 'Mercuriuss',
//     zone: 'planet',
//     weapon: 'ksar_sniper_ballistic_01_2699725233662',
//     rsi_profile: 'https://robertsspaceindustries.com/citizens/Mercuriuss',
//     game_mode: 'EA_FPSGunGame',
//     client_ver: '7.0',
//     killers_ship: 'N/A',
//     key: '82d2d7a4f738c905db556f6cd904e8c3'
//   }

// {
//     id: '1744654036375',
//     patch: '4.1',
//     time: 2025-04-14T18:07:15.556Z,
//     player: 'DocHound',
//     victim: 'Mercuriuss',
//     zone: 'planet',
//     weapon: 'ksar_pistol_ballistic_01_2699725233735',
//     rsi_profile: 'https://robertsspaceindustries.com/citizens/Mercuriuss',
//     game_mode: 'EA_FPSGunGame',
//     client_ver: '7.0',
//     killers_ship: 'N/A',
//     key: '82d2d7a4f738c905db556f6cd904e8c3'
//   }

// { GRENADE KILL
//     id: '1744654477359',
//     patch: '4.1',
//     time: 2025-04-14T18:14:36.924Z,
//     player: 'DocHound',
//     victim: 'Mercuriuss',
//     zone: 'stanton4',
//     weapon: 'unknown',
//     rsi_profile: 'https://robertsspaceindustries.com/citizens/Mercuriuss',
//     game_mode: 'EA_Elimination',
//     client_ver: '7.0',
//     killers_ship: 'N/A',
//     key: '82d2d7a4f738c905db556f6cd904e8c3'
//   }

// id: 
// user_id: 
// ship_used: 
// ship_killed: 
// value: 
// kill_count: 
// victims: 
// patch: 
// assists: 

// <2025-04-14T16:42:53.465Z> [Notice] <Actor Death> CActor::Kill: 'idkausername_27' [202063593546] in zone 'OOC_Stanton_2a_Cellin' killed by 'DocHound' [202061381370] using 'lbco_pistol_energy_01_2698343630880' [Class lbco_pistol_energy_01] with damage type 'Bullet' from direction x: -0.995284, y: -0.073818, z: -0.062935 [Team_ActorTech][Actor] ::: FPS kill on Kraeah station.
// <2025-04-14T17:10:51.498Z> [Notice] <Actor Death> CActor::Kill: 'Mercuriuss' [200146297631] in zone 'ANVL_Hornet_F7A_Mk2_2699085238610' killed by 'DocHound' [202061381370] using 'RSI_Bespoke_BallisticCannon_A_2699085238957' [Class unknown] with damage type 'VehicleDestruction' from direction x: 0.000000, y: 0.000000, z: 0.000000 [Team_ActorTech][Actor] ::: Ship kill from Turret
// <2025-04-14T17:16:18.806Z> [Notice] <Actor Death> CActor::Kill: 'Mercuriuss' [200146297631] in zone 'ANVL_Hornet_F7A_Mk2_2699085240659' killed by 'DocHound' [202061381370] using 'MRCK_S10_RSI_Polaris_Torpedo_lb_2699085238828' [Class MRCK_S10_RSI_Polaris_Torpedo_lb] with damage type 'Explosion' from direction x: 0.383955, y: 1.041579, z: -0.330675 [Team_ActorTech][Actor] ::: Ship kill from Torpedo
// <2025-04-14T17:22:04.228Z> [Notice] <Actor Death> CActor::Kill: 'Mercuriuss' [200146297631] in zone 'RSI_Polaris_2699085238718' killed by 'DocHound' [202061381370] using 'behr_rifle_ballistic_01_2699085238600' [Class behr_rifle_ballistic_01] with damage type 'Bullet' from direction x: 0.040409, y: -0.998474, z: 0.037640 [Team_ActorTech][Actor] ::: FPS kill on RSI Polaris
