const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
//Blogin skeema, jossa se tallennetaan
const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
const mongoUrl = 'mongodb+srv://fullstack:s4l4sana@cluster0-t4ghf.mongodb.net/blogs?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})

app.get('/api/blogs', ( request, response ) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', ( request, response) => {
    const blog= new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

app.use(cors())
app.use(express.json())

module.exports = app