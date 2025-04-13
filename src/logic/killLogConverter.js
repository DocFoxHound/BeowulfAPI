const KeyModel = require('../models/keyModel');
const UserModel = require('../models/userModel');
const ShipModel = require('../models/uexShipModel');
const BlackBox = require('../models/blackBoxModel');
const stringSimilarity = require('string-similarity');

async function killLogConvert(reportKill){
    try{
        const id = reportKill.id;
        const patch = reportKill.patch;
        const time = reportKill.time;
        const player = reportKill.player;
        const victim = reportKill.victim;
        const zone = reportKill.zone;
        const weapon = reportKill.weapon;
        const rsi_profile = reportKill.rsi_profile;
        const game_mode = reportKill.game_mode;
        const client_ver = reportKill.client_ver;
        const playerShip = reportKill.killers_ship;
        const killedShip = zone.slice(5, -14).replace(/_/g, ' ');
        const key = reportKill.key;
        const keyUserPair = await KeyModel.findOne({
            where: {
                key: key
            }
        });
        const userId = keyUserPair.user_id;
        const userData = await UserModel.findByPk(req.params.id);
        const allShips = await ShipModel.findAll();

        let matchedKilledShipObject = "unknown";
        try{
            const normalizedKilled = normalizeShipName(killedShip);
            const shipNames = allShips.map(s => s.ship);
            const matchKilled = stringSimilarity.findBestMatch(normalizedKilled, shipNames);
            const bestKilledMatchName = shipNames[shipNames.indexOf(matchKilled.bestMatch.target)];
            matchedKilledShipObject = allShips.find(ship => ship.ship === bestKilledMatchName);
        } catch (error) {
            console.error("Error matching killed ship: ", error.message);
        }

        let matchedPlayerShipObject = "unknown";
        if(playerShip !== "N/A"){
            try{
                playerShip = playerShip.slice(5, -14).replace(/_/g, ' ');
                const normalizedPlayerShip = normalizeShipName(playerShip);
                const matchPlayer = stringSimilarity.findBestMatch(normalizedPlayerShip, shipNames);
                const bestPlayerMatchName = shipNames[shipNames.indexOf(matchPlayer.bestMatch.target)];
                matchedPlayerShipObject = allShips.find(ship => ship.ship === bestPlayerMatchName);
            }catch (error) {
                console.error("Error matching player ship: ", error.message);
            }
        }

        console.log(`Matched killed ship: "${killedShip}" → "${bestMatchName}"`);

        const newBlackBox = new BlackBox({
            id: id,
            user_id: userId,
            ship_used: matchedPlayerShipObject !== "unknwon" ? matchedPlayerShipObject.ship : "unknown",
            ship_killed: matchedKilledShipObject !== "unknown" ? matchedKilledShipObject.ship : "unknown",
            value: matchedKilledShipObject !== "unknown" ? matchedKilledShipObject.avg_price : 0,
            kill_count: 1,
            victims: victim,
            patch: patch,
            assists: [],
        });
        const savedBlackBox = await newBlackBox.save();

    } catch (error) {
        console.error("Error in killLogConvert: ", error.message);
    }
}

// dataValues: {
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

// id: 
// user_id: 
// ship_used: 
// ship_killed: 
// value: 
// kill_count: 
// victims: 
// patch: 
// assists: 

function normalizeShipName(name) {
    return name
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\bmk1\b/gi, 'mk i')       // replace mk2 → mk ii
        .replace(/\bmk2\b/gi, 'mk ii')       // replace mk2 → mk ii
        .replace(/\bmk3\b/gi, 'mk iii')      // optional extras
        .replace(/\bmk4\b/gi, 'mk iv')      // optional extras
        .replace(/\bmk5\b/gi, 'mk v')      // optional extras
        .replace(/[^a-z0-9 ]/gi, '')          // remove special chars
        .trim();
}

module.exports = {
    killLogConvert
};