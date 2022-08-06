const AccountModel = require('../models/Account')
const response = require('../utils/res')

const Account = {
  signUp: (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let created_date = new Date()

    const model = new AccountModel({email, password, created_date})
    model.save((err) => {
      if (err){
        response.failed(`Failed to create account! Log: ${console.error(err)}`, res)
      }
      response.ok(`Success creating account!`, res)
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
}

module.exports = Account