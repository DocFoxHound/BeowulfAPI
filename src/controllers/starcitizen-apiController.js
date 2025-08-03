const axios = require('axios'); 

// Handle GET request for Star Citizen user by handle
exports.getPlayer = async (req, res) => {
    const apikey = process.env.SCI_API_KEY;
    const mode = 'auto'; // or live/auto
    const handle = req.params.handle || req.query.handle;
    console.log(`\n\nFetching Star Citizen data for handle: ${handle}`);
    if (!apikey) {
        return res.status(500).json({ error: 'Missing SCI_API_KEY in environment.' });
    }
    if (!handle) {
        return res.status(400).json({ error: 'Missing handle parameter.' });
    }
    const url = `https://api.starcitizen-api.com/${apikey}/v1/${mode}/user/${handle}`;
    try {
        const response = await axios.get(url);
        const data = response.data?.data;
        console.log("\n\nStar Citizen API Response:", data?.profile);
        res.status(200).json({ profile: data?.profile, organization: data?.organization });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};