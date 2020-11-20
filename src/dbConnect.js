const {Sequelize} = require('sequelize');
const {dbConf} = require('./config.json');

module.exports = new Sequelize(dbConf.database, dbConf.user, dbConf.password, {
    host: dbConf.host,
    port: dbConf.port,
    dialect: 'postgres',
    define: {
        timestamps: false
    }
});