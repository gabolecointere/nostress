const { Item } = require('../models')
const { to, ReE, ReS } = require('../services/utilService')

const create = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let err, item
  let user = req.user

  let itemInfo = req.body
  itemInfo.users = [{ user: user._id }];

  [err, item] = await to(Item.create(itemInfo))
  if (err) return ReE(res, err, 422)

  return ReS(res, { item: item.toWeb() }, 201)
}

module.exports.create = create

const getAll = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let user = req.user
  let err, items

  [err, items] = await to(user.Items())
  if (err) return ReE(res, err, 422)

  let itemsJson = []
  for (let i in items) {
    let item = items[i]
    itemsJson.push(item.toWeb())
  }

  return ReS(res, { items: itemsJson })
}

module.exports.getAll = getAll

const get = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let item = req.item
  return ReS(res, { item: item.toWeb() })
}

module.exports.get = get

const update = async (req, res) => {
  let err, item, data
  item = req.user
  data = req.body
  item.set(data);

  [err, item] = await to(item.save())
  if (err) return ReE(res, err)

  return ReS(res, { item: item.toWeb() })
}

module.exports.update = update

const remove = async (req, res) => {
  let item, err
  item = req.item;

  [err, item] = await to(item.remove())
  if (err) return ReE(res, 'error occured trying to delete the item')

  return ReS(res, { message: 'Deleted Item' }, 204)
}
module.exports.remove = remove
