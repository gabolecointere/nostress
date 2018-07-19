// const { to, ReE, ReS } = require('../services/utilService')

const dashboard = (req, res) => {
  let user = req.user
  return res.json({
    success: true,
    message: 'it worked',
    data: 'your email is : ' + user.email})
}

module.exports.dashboard = dashboard
