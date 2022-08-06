const mongoose = require('mongoose')
const { Schema } = mongoose
const Profile = mongoose.model('Profile', {
  name: String,
  age: Number,
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
})

module.exports = Profile