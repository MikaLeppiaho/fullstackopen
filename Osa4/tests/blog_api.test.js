const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        "title": "React patterns",
        "author": "Michael Chan",
        "url": "https://reactpatterns.com/",
        "likes": 7,
   
    },
    {
        "title": "Go To Statement Considered Harmful",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        "likes": 5,
       
    },
    {
        "title": "Canonical string reduction",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        "likes": 12,
    
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})

test('blogs are returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test('There is only 3 blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
})
test('The identifying field is ID', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(blog => blog.id)
    console.log('contents', contents)
    expect(contents).toBeDefined()
})

test('You can post a blog with HTTP POST', async () => {
    const newBlog = {
        title: "Functional Fun",
        author: "Mika Leppiaho",
        url: "https://functionalfun.com/",
        likes: 3
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(blog => blog.title)

    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(contents).toContain('Functional Fun')
     
})

test('Post without likes is given value 0', async () => {
    const zeroLikeBlog = {
        title: "Functional zero",
        author: "Mika Leppiaho",
        url: "https://functionalfun.com/"
    }

    await api
    .post('/api/blogs')
    .send(zeroLikeBlog)
    .expect(200)

    const response = await api.get('/api/blogs')
    console.log("ZeroLikes: ", initialBlogs.length)
    expect(response.body[initialBlogs.length].likes).toBe(0)

})

afterAll(() => {
    mongoose.connection.close()
})