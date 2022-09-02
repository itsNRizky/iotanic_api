const ProfileModel = require('../models/Profile')
const response = require('../utils/res')
const mongoose = require('mongoose')
const Profile = {
  createProfile: (id) => { //digunakan di controller signup only
    let name = 'Ubah Nama Anda'
    let age = 0
    let account = mongoose.Types.ObjectId(id)
    const model = new ProfileModel({name, age, account})
    model.save((err) => {
      if (err){
        return console.error(err)
      }
      return console.log(model)
    })
  },

  getProfileByAcc: (req, res) => {
    let id = mongoose.Types.ObjectId(req.params.id)
    ProfileModel.findOne({account: id}, (err, profile) => {
      if (err){
        response.failed({
          value: null,
          msg: `Could not retrieve profile by Account ID: ${id} | Log: ${console.error(err)}`
        }, res)
      }

      response.ok({
        value: profile,
        msg: `Success retrieving profile by Account ID: ${id}`
      }, res)
    })
  }, 
}

module.exports = Profile