const Sequelize = require('sequelize')

const databaseURL = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres'

const db = new Sequelize(databaseURL)

db      // { force: true}
    .sync()
    .then(() => console.log('Database is updated'))
    .catch(console.error)

module.exports = db