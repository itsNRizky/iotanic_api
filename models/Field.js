const mongoose = require('mongoose')
const { Schema } = mongoose
const Field = mongoose.model('Field', {
  field_name: String,
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  longitude: String,
  latitude: String,
})

module.exports = Field