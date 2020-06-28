const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const middleWare = require('./utils/middleware')
const mongoose = require('mongoose')

console.log(`Connecting to ${config.MONGODB_URI}`)


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(()=> {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error conneting to MongoDB: ', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleWare.requestLogger)

app.use('/api/blogs',blogRouter)
app.use(middleWare.unknownEndpoint)
app.use(middleWare.errorHandler)

module.exports = app