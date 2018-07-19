const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const models = {}
const mongoose = require('mongoose')
const CONFIG = require('../config/config')

if (CONFIG.db_host !== '') {
  fs
    .readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
      let filename = file.split('.')[0]
      let modelName = filename.charAt(0).toUpperCase() + filename.slice(1)
      models[modelName] = require('./' + file)
    })

  mongoose.Promise = global.Promise // set mongo up to use promises
  const mongoLocation = 'mongodb://' + CONFIG.db_host + ':' + CONFIG.db_port + '/' + CONFIG.db_name

  mongoose.connect(mongoLocation)
    .catch(err => console.log('*** Can Not Connect to Mongo Server:', mongoLocation, err))

  let db = mongoose.connection
  module.exports = db

  db.once('open', () => console.log('Connected to mongo at ' + mongoLocation))
  db.on('error', error => console.log('error', error))
} else console.log('No Mongo Credentials Given')

module.exports = models
