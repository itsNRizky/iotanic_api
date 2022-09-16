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
      ph: 0,
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
          available: null,
          msg: `Error checking the device | Log: ${console.error(err)}`
        }, res)
      }
      if (device.user != null){
        response.ok({
          available: false,
          deviceID: null,
          msg: `Device already has the user with ID: ${device.user}`
        }, res)
      } else{
        response.ok({
          available: true,
          deviceID: deviceID,
          msg: `Device doesn't have a user, user can register!`
        }, res)
      }
    })
  },

  setUser: (req, res) => {
    let deviceID = req.body.device
    let deviceName = req.body.name
    let profileID = mongoose.Types.ObjectId(req.body.profile)

    DeviceModel.updateOne({_id: deviceID}, {user: profileID,  name: deviceName}, (err) => {
      if (err){
        response.failed(`Failed updating device's user ID: ${profileID} | Log: ${console.error(err)}`, res)
      }

      response.ok(`Success updating device's user`, res)
    })
  },

  userDevices: (req, res) => {
    let profileID = mongoose.Types.ObjectId(req.body.profile)
    DeviceModel.find({user: profileID}, (err, dvcs) => {
      if (err){
        response.failed(`Failed getting user's device | Log: ${console.error(err)}`)
      }

      response.ok({
        devices: dvcs
      }, res)
    })
  },

  saveRecords: (req, res) => {
    let {n, p, k, ph, t} = req.params
    let id = mongoose.Types.ObjectId(req.params.id)
    
    DeviceModel.updateOne({_id: id}, {$push: {records: {n,p,k,ph,datetime: t}}}, (err) => {
      if (err){
        response.failed({
          record: null,
          msg: `Error saving records to ID: ${id} | Log: ${console.error(err)}`
        }, res)
      }

      response.ok({
        record: {n,p,k,ph,datetime: t},
        msg: `Success saving records of ID: ${id}`
      }, res)
    })
  }
}

module.exports = Device