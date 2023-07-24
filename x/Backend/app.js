const express = require('express')
const cors = require("cors")

const bodyParser = require('body-parser')
const approutes = require('./routes/userRoutes')
const app = express()
const mongoose = require("mongoose")
var connectionUrl = "mongodb://0.0.0.0:27017/ecommerce"
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(approutes); //routes from router

mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3001, () => {
        console.log('Example app listening on port 3001!')
    }))
    .catch(err => console.log(err));
