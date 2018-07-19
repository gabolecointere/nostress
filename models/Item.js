const mongoose = require('mongoose')

let ItemSchema = mongoose.Schema({
  name: { type: String },
  users: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    permissions: [{ type: String }]
  }]
}, {
  timestamps: true
})

const _self = this

ItemSchema.methods.toWeb = () => {
  let json = _self.toJSON()
  json.id = _self._id // this is for the front end
  return json
}

module.exports = mongoose.model('Item', ItemSchema)
