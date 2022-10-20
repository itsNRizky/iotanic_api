const mongoose = require('mongoose')
const { Schema } = mongoose
const FieldRecord = mongoose.model('Field', {
  field: {
    type: Schema.Types.ObjectId,
    ref: 'Field'
  },
  device: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  },
  record_time: Date,
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

module.exports = FieldRecord