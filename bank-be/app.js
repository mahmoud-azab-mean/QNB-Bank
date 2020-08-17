const express = require('express')
// to parse the incomming bodies of Json
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload")

const mongoose = require("mongoose")

const app = express()
const server = require('http').createServer(app)


const customerRouter = require('./routes/customer.route')
const countryCustomersRouter = require('./routes/countryCustomers.route')
const DB_URL = 'mongodb://localhost:27017/Bank'
mongoose.connect(DB_URL, {useNewUrlParser: true, useFindAndModify: false,  useUnifiedTopology: true})
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDb Connection Error!!!"))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(fileUpload())
app.use('/images', express.static(__dirname + '/uploads'))

app.use("/customers", customerRouter)
app.use("/countryCustomers", countryCustomersRouter)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "Yhttp://127.0.0.1:5500/.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


const port = process.env.PORT || 3000
server.listen(port, ()=> {
    console.log("server listen on port " + port )
})