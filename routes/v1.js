const express = require('express')
const router = express.Router()

const UserController = require('./../controllers/UserController')
const ItemController = require('./../controllers/ItemController')
const HomeController = require('./../controllers/HomeController')

const custom = require('./../middleware/custom')

const passport = require('passport')

require('./../middleware/passport')(passport)

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({
    status: 'success',
    message: 'Your starter api',
    data: {'version_number': 'v1.0.0'}
  })
})

router.post('/users', UserController.create) // C
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get) // R
router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update) // U
router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove) // D
router.post('/users/login', UserController.login)

router.post('/items', passport.authenticate('jwt', { session: false }), ItemController.create) // C
router.get('/items', passport.authenticate('jwt', { session: false }), ItemController.getAll) // R

router.get('/items/:item_id', passport.authenticate('jwt', { session: false }), custom.item, ItemController.get) // R
router.put('/items/:item_id', passport.authenticate('jwt', { session: false }), custom.item, ItemController.update) // U
router.delete('/items/:item_id', passport.authenticate('jwt', { session: false }), custom.item, ItemController.remove) // D

router.get('/dash', passport.authenticate('jwt', { session: false }), HomeController.dashboard)

module.exports = router
