const mongoose = require('mongoose')

const AccountsModel = mongoose.model('Account', {
  email: String,
  password: String,
  created_date: Date
})

module.exports = AccountsModel