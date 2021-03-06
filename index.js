const   express         =   require('express')
const   bodyParser      =   require('body-parser')
const   cookieparser    =   require('cookie-parser')
const   db              =   require('./db/index')()
const   cors            =   require('cors')

//===== Glogal CFG =====
global.db = db;
global.express = express;

//===== Config sets =====
const { serverConfig } = require('config')

//===== Set up express APP =====
const app = express()

//===== APP USE =====
app.use(bodyParser.json())
app.use(cors())
app.use(cookieparser())

//===== Routes =====
const auth = require('./routes/auth')
const api = require('./routes/api/')

app.use('/user', auth.router)
app.use('/api', api.router)

//==== Lesten Requests =====
app.listen(serverConfig.port || '3377', serverConfig.host || 'localhost', () => {
    console.log(`Server has been started in ${serverConfig.host}:${serverConfig.port}`);
})