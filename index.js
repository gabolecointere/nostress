const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const pe = require('parse-error')
const cors = require('cors')
const v1 = require('./routes/v1')

const app = express()

const CONFIG = require('./config/config')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// passport
app.use(passport.initialize())

// Log env
console.log('Environment:', CONFIG.app)

// Database connection
require('./models')

// cors
app.use(cors())

app.use('/v1', v1)

app.use('/', (req, res) => {
  res.statusCode = 200 // send the appropiate status code
  res.json({
    status: 'success',
    message: 'Your starter API',
    data: {}
  })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

const port = CONFIG.port

app.listen(port, () => {
  console.log('Running on port ' + port)
})

module.exports = app

process.on('unhandledRejection', error => {
  console.error('Uncaught Error', pe(error))
})
