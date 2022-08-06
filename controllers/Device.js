const DeviceModel = require('../models/Device')
const mongoose = require('mongoose')
const response = require('../utils/res')

const Device = {
  createDevice: (req, res) => {
    let name = 'Masukkan nama'
    let user = null
    let records = [{
      n: 0, 
      p: 0, 
      k: 0,
      datetime: new Date()
    }]
    const model = new DeviceModel({name, user, records})
    model.save((err) => {
      if (err){
        response.failed({
          DeviceID: null,
          msg: `Failed creating new device | Log: ${console.error(err)}`
        }, res)
      }

      response.ok({
        DeviceID: model.id,
        msg: `Success creating new device`
      }, res)
    })
  },

  checkNull: (req, res) => {
    let deviceID = mongoose.Types.ObjectId(req.body.device)
    
    DeviceModel.findOne({_id: deviceID}, (err, device) => {
      if(err){
        response.failed({
          value: null,
          msg: `Error getting the user | Log: ${console.error(err)}`
        }, res)
      }
      if (device.get('user') != null){
        response.ok({
          value: false,
          msg: `Device already has the user with ID: ${device.get('user')}`
        }, res)
      } else{
        response.ok({
          value: true,
          msg: `Device doesn't have a user, user can register!`
        }, res)
      }
    })
  },

  setUser: (req, res) => {
    let deviceID = req.body.device
    let userID = mongoose.Types.ObjectId(req.body.profile)

    DeviceModel.updateOne({_id: deviceID}, {user: userID}, (err) => {
      if (err){
        response.failed({
          value: null,
          msg: `Failed updating device's user ID: ${userID} | Log: ${console.error(err)}`
        }, res)
      }

      response.ok({
        value: {deviceID, userID},
        msg: `Success updating device's user`
      }, res)
    })
  },

  saveRecords: (req, res) => {
    let {n, p, k, t} = req.params
    let id = mongoose.Types.ObjectId(req.params.id)
    
    DeviceModel.updateOne({_id: id}, {$push: {records: {n,p,k,datetime: t}}}, (err) => {
      if (err){
        response.failed({
          value: null,
          msg: `Error saving records to ID: ${id} | Log: ${console.error(err)}`
        }, res)
      }

      response.ok({
        value: {n,p,k,datetime: t},
        msg: `Success saving records of ID: ${id}`
      }, res)
    })
  }
}

module.exports = Device