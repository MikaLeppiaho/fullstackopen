const express = require("express")
require('express-async-errors')
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


logger.info('Connectiong to', config.MONGODB_URI)

getConnection = async () => {
    try{
        await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
        logger.info('Connected to MongoDB')
    } catch (err) {
        logger.error('Error connecting to MongoDB: ',error.message)
    }
}

getConnection()

app.use(cors())

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/users', userRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app