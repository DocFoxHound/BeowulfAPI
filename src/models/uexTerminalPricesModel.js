const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a config file for Sequelize

class TerminalPrice extends Model {}

TerminalPrice.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    id_commodity: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_star_system: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_planet: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_orbit: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_moon: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_city: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_outpost: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_poi: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_terminal: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    id_faction: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_buy: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_buy_min: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_buy_min_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_buy_min_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_buy_max: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_buy_max_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_buy_max_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_buy_avg: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_buy_avg_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_buy_avg_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_buy_users: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_buy_users_rows: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_sell: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_sell_min: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_sell_min_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_sell_min_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_sell_max: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_sell_max_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_sell_max_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_sell_avg: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_sell_avg_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_sell_avg_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_sell_users: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    price_sell_users_rows: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_buy: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_buy_min: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_buy_min_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_buy_min_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_buy_max: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_buy_max_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_buy_max_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_buy_avg: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_buy_avg_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_buy_avg_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_buy_users: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_buy_users_rows: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_stock: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_stock_avg: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_stock_avg_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_stock_avg_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_min: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_min_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_min_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_max: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_max_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_max_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_avg: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_avg_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_avg_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_users: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    scu_sell_users_rows: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_buy: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_buy_min: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_buy_min_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_buy_min_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_buy_max: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_buy_max_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_buy_max_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_buy_avg: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_buy_avg_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_buy_avg_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_sell: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_sell_min: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_sell_min_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_sell_min_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_sell_max: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_sell_max_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_sell_max_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_sell_avg: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_sell_avg_week: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    status_sell_avg_month: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    volatility_buy: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    volatility_sell: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    volatility_price_buy: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    volatility_price_sell: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    volatility_scu_buy: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    volatility_scu_sell: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    faction_affinity: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    container_sizes: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    game_version: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    date_added: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    date_modified: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    commodity_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    commodity_code: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    commodity_slug: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    star_system_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    planet_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    orbit_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    moon_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    space_station_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    city_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    outpost_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    poi_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    faction_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    terminal_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    terminal_slug: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    terminal_code: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    terminal_mcs: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    },
    terminal_is_player_owned: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: false,
    }
}, {
    sequelize, // This is the Sequelize instance you must pass
    modelName: 'TerminalPrice', // We need to choose the model name
    tableName: 'uex_terminal_prices', // Specify the table name
    timestamps: false // Turn off Sequelize auto creating updatedAt and createdAt
});

// Export the model
module.exports = TerminalPrice;
