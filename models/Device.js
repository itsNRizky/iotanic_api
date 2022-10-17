const mongoose = require('mongoose')

const Device = mongoose.model('Device', {
  name: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Profile'
  },
  records: [
    {
      n: mongoose.Types.Decimal128,
      p: mongoose.Types.Decimal128,
      k: mongoose.Types.Decimal128,
      ph: mongoose.Types.Decimal128,
      datetime: Date
    }
  ]
})

module.exports = Device