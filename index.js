const Express = require('express')
const bodyParser = require('body-parser')
const responses = require('./utils/res')

const cors = require('cors')
require('./utils/db')

const app = Express()
const port = process.env.PORT || 3600

const Account = require('./controllers/Account')
const Profile = require('./controllers/Profile')
const Device = require('./controllers/Device')


//Setup
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(bodyParser.json())

//===========Route===============
app.get('/', (req, res) => {
  responses.ok("IoTanic API works properly!", res)
})

app.post('/api/signup', Account.signUp)
app.post('/api/signin', Account.signIn)
app.get('/api/account', Account.getAccount)

app.get('/api/profile/:id/', Profile.getProfileByAcc)
app.post('/api/profile/create', Profile.createProfile)

app.get('/api/device/create', Device.createDevice)
app.post('/api/device/set', Device.setUser)
app.post('/api/device/check', Device.checkNull)

app.get('/api/records/:id/:n/:p/:k/:t', Device.saveRecords)

app.listen(port, () => {
  console.log(`API IoTanic | Listening http://localhost:${port}`)
})