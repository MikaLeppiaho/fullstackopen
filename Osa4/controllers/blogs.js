const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response, next) => {

    const body = request.body

    if (!body.title && !body.url) {
      return response.status(400)
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes
    })
    try {
      const savedBlog = await blog.save()
      response.json(savedBlog.toJSON())
    } catch(exception) {
      next(exception)
    }
})

module.exports = blogRouter

if (!body.content) {
  return response.status(400).json({ 
    error: 'content missing' 
  })
}