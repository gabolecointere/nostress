const {to} = require('await-to-js')
const pe = require('parse-error')

module.exports.to = async (promise) => {
  let err, res
  [err, res] = await to(promise)
  if (err) return [pe(err)]

  return [null, res]
}

module.exports.ReE = (res, err, code) => { // Error Web Response
  if (typeof err === 'object' && typeof err.message !== 'undefined') {
    err = err.message
  }

  if (typeof code !== 'undefined') res.statusCode = code

  return res.json({
    success: false,
    error: err
  })
}

module.exports.ReS = (res, data, code) => { // Success Web Response
  let sendData = {
    success: true
  }

  if (typeof data === 'object') {
    sendData = Object.assign(data, sendData) // merge the objects
  }

  if (typeof code !== 'undefined') res.statusCode = code

  return res.json(sendData)
}

module.exports.TE = (errMessage, log) => { // TE stands for Throw Error
  if (log === true) {
    console.error(errMessage)
  }

  throw new Error(errMessage)
}
