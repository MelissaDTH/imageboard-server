const Sequelize = require("sequelize");
const db = require("../db");

const Image = db.define("image", {
  url: Sequelize.STRING,
  title: Sequelize.STRING
}, {
  timestamps: false,
  tableName: 'image'
});

module.exports = Image;
