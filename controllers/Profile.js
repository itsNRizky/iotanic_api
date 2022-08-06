const ProfileModel = require('../models/Profile')
const response = require('../utils/res')
const mongoose = require('mongoose')
const Profile = {
  createProfile: (req, res) => {
    let name = req.body.name
    let age = req.body.age
    let account = mongoose.Types.ObjectId(req.body.account)
    const model = new ProfileModel({name, age, account})
    model.save((err) => {
      if (err) {
        response.failed({
          value: null,
          msg: `Failed saving user's profile | Log: ${console.error(err)}`
        }, res)
      }
      response.ok({
        value: {name, age, account},
        msg: `Success saving user's profile`
      },res)
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
  }
}

module.exports = Profile