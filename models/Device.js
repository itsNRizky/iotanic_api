const mongoose = require('mongoose')

const Device = mongoose.model('Device', {
  name: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Profile'
  },
  records: [
    {
      n: Number,
      p: Number,
      k: Number,
      ph: Number,
      datetime: Date
    }
  ]
})

module.exports = Device