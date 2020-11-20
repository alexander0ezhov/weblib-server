const {DataTypes} = require('sequelize');
const dbConnect = require('../dbConnect');

module.exports = dbConnect.define('books', {
 id: {
  type: DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true
 },
 name: DataTypes.STRING,
 author: DataTypes.STRING,
 description: DataTypes.TEXT,
 isbn: DataTypes.BIGINT,
 date_public: DataTypes.DATEONLY,
 publisher: DataTypes.STRING,
 lang: DataTypes.STRING,
 is_in_stock: DataTypes.BOOLEAN
});