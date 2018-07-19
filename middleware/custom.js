const Item = require('../models/Item')
const { to, ReE } = require('../services/utilService')

let item = async (req, res, next) => {
  let itemId, err, item
  itemId = req.params.item_id;

  [err, item] = await to(Item.findOne({_id: itemId}))
  if (err) return ReE(res, 'err finding item')

  if (!item) return ReE(res, 'Item not found with id: ' + itemId)
  let user, usersArray
  user = req.user
  usersArray = item.users.map(obj => String(obj.user))

  if (!usersArray.includes(String(user._id))) return ReE(res, 'User does not have permission to read item with id: ' + itemId)

  req.item = item
  next()
}
module.exports.item = item
