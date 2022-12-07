const FieldModel = require('../models/Field')
const response = require('../utils/res')

const Field = {
  getFieldByProfileId: (req, res) => {
    let profileID = req.body.profileID
  },

  addField: (req, res) => {
    let field_name = req.body.field
    let profileID = req.body.profileid
    let longitude = req.body.long
    let latitude = req.body.lat

    const model = new FieldModel({field_name, profileID, longitude, latitude})
    model.save((err) => {
      if (err){
        response.failed(`Failed creating crops_field | LOG: ${console.error(err)}`, res)
      }

      response.ok(`Success creating crops_field`, res)
    })
  },

  updateField: (req, res) => {
    let id = req.body.id
    let name = req.body.name
    let lat = req.body.lat
    let longt = req.body.langt

    FieldModel.updateOne({_id: id}, {name, lat, longt}, (err) => {
      if (err){
        response.failed(`Failed to update the field with id: ${id}`, res)
      }

      response.ok(`Success updating the field with id: ${id}`, res)
    })
  },

  deleteField: (req, res) => {
    let id = req.body.id

    FieldModel.remove({_id: id}, (err) => {
      if (err){
        response.failed(`Failed deleting the field with id: ${id}`, res)
      }

      response.ok(`Success deleting user with id: ${id}`, res)
    })
  }
}

module.exports = Field