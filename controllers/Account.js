const AccountModel = require('../models/Account')
const response = require('../utils/res')

const Account = {
  signUp: (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let created_date = new Date()

    const model = new AccountModel({email, password, created_date})
    AccountModel.findOne({email, password}, (err, acc) => {
      if(acc){
        response.ok(`Account is already registered`, res)
      }else{
        model.save((err) => {
          if (err){
            response.failed(`Failed to create account! Log: ${console.error(err)}`, res)
          }
          response.ok(`Success creating account!`, res)
        })
      }
    })
  },

  signIn: (req, res) => {
    let email = req.body.email
    let password = req.body.password
    
    AccountModel.findOne({email, password}, (err, acc) => {
      if (err){
        response.failed({
          value: null,
          msg: `Error signin user | Log: ${err}`
        }, res)
      }

      response.ok(acc,res)
    })
  },

  getAccount: (req, res) => {
    AccountModel.find((err, accs) => {
      if (err){
        response.failed({
          value: null,
          msg: `Error getting all accounts | Log: ${console.error(err)}`
        }, res)
      }

      response.ok({
        accounts: accs
      }, res)
    })
  }
}

module.exports = Account