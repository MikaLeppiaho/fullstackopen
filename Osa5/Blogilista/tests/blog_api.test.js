const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')
const User = require('../models/user')

const api = supertest(app)


beforeEach(async () => {
    const newUser = {
        name: "Mika Testaaja",
        username: "mTestaaja",
        password: "salasana"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect('Content-Type', /application\/json/)

    const loginInfo = {
        username: "mTestaaja",
        password: "salasana"
    } 
    const login = await api
        .post('/api/login')
        .send(loginInfo)

    await User.deleteMany({})
    await User.insertMany(listHelper.initialUsersList)
    await Blog.deleteMany({})
    const response = await api.get('/api/blogs')
    console.log('beforeEachlog', response.body)
    await Blog.insertMany(listHelper.initialBlogList)
    

    
    
})

test('The correct amoung of JSON type blogs returned', async () => {
    const response = await api.get('/api/blogs')
        .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(listHelper.initialBlogList.length)

})

test('Is the identifying field named "id"', async () => {
    const response = await api.get('/api/blogs')
    const responseId = response.body.map(r => r.id)
    console.log("response",response.body.id)
    expect(responseId).toBeDefined()
})

test('You can add blogs with POST', async () => {
    const newBlogPost = {
        title: "Blog for the test", 
        author: "Mika Leppiaho", 
        url: "localhost:80", 
        likes: 0
    }

    const newUser = {
        name: "Mika Testaaja",
        username: "mTestaaja",
        password: "salasana"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect('Content-Type', /application\/json/)

    const loginInfo = {
        username: "mTestaaja",
        password: "salasana"
    } 
    const login = await api
        .post('/api/login')
        .send(loginInfo)

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${login.body.token}`)
        .send(newBlogPost)
        .expect(200)
        .expect('Content-TYpe', /application\/json/)

    const response = await api.get('/api/blogs')

    console.log("Responselog: ", response)

    const contents = response.body.map(r => r.title)
    expect(response.body).toHaveLength(listHelper.initialBlogList.length + 1)
    expect(contents).toContain("Blog for the test")
})

test('A posted blog with empty likes defaults to zero', async () => {

    const newBlogPost = {
        title: "No likes", 
        author: "Mika Leppiaho", 
        url: "localhost:1",
    }

    const newUser = {
        name: "Mika Testaaja",
        username: "mTestaaja",
        password: "salasana"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect('Content-Type', /application\/json/)

    const loginInfo = {
        username: "mTestaaja",
        password: "salasana"
    } 
    const login = await api
        .post('/api/login')
        .send(loginInfo)

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${login.body.token}`)
        .send(newBlogPost)
        .expect(200)
        .expect('Content-TYpe', /application\/json/)
    
    const response = await api.get('/api/blogs')

    const numberOfLikes = response.body.map(r => r.likes)

    expect(numberOfLikes[listHelper.initialBlogList.length]).toBe(0)
        
})

test('Blog without title and url is not added', async () => {
    const newBlogPost = {
        author: "Mika Leppiaho", 
    }

    const newUser = {
        name: "Mika Testaaja",
        username: "mTestaaja",
        password: "salasana"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect('Content-Type', /application\/json/)

    const loginInfo = {
        username: "mTestaaja",
        password: "salasana"
    } 
    const login = await api
        .post('/api/login')
        .send(loginInfo)
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(newBlogPost)
      .expect(400)
  
    const blogsAtEnd = await listHelper.BlogsInDb()
  
    expect(blogsAtEnd.length).toBe(listHelper.initialBlogList.length)
  })

test('Removing a blog post by id succeeds', async () => {
    const newUser = {
        name: "Mika Testaaja",
        username: "mTestaaja",
        password: "salasana"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect('Content-Type', /application\/json/)

    const loginInfo = {
        username: "mTestaaja",
        password: "salasana"
    } 
    const login = await api
        .post('/api/login')
        .send(loginInfo)

    const newBlogPost = {
        title: "Blog for the test", 
        author: "Mika Leppiaho", 
        url: "localhost:80", 
        likes: 0
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${login.body.token}`)
        .send(newBlogPost)
        .expect(200)
        .expect('Content-TYpe', /application\/json/)

    
    const blogsAtStart = await listHelper.BlogsInDb()
    const blogToBeRemoved = blogsAtStart[blogsAtStart.length-1]

    await api
        .delete(`/api/blogs/${blogToBeRemoved.id}`)
        .set('Authorization', `Bearer ${login.body.token}`)
        .expect(204)
    
    const blogsAtEnd = await listHelper.BlogsInDb()
    
    expect(blogsAtEnd).toHaveLength(listHelper.initialBlogList.length)

    const contents = blogsAtEnd.map(r => r.id)
    console.log(`Contents: ${contents}`)
    expect(contents).not.toContain(blogToBeRemoved.id)

})

test('Updating a blog post succeeds', async () => {
    const blogsAtStart = await listHelper.BlogsInDb()
    const blogToUpdate = blogsAtStart[0]
    console.log("likes",blogToUpdate.id)
    const newBlogPost = {
        likes: 5, 
    }


    await api.put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlogPost)


    const blogAtEnd = await listHelper.BlogsInDb()

    expect(blogAtEnd[0].likes).toEqual(5)
        
})

describe('Usermanagement', () => {
    test('A new user is successfully added', async () => {
        const usersAtStart = await listHelper.UsersInDb()

        const newUser = {
            name: "Mika Testaaja",
            username: "mTestaaja",
            password: "salasana"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect('Content-Type', /application\/json/)

        const response = await listHelper.UsersInDb()

        expect(response).toHaveLength(usersAtStart.length+1)
    })

    test('A user with no name is not added', async () => {
        const usersAtStart = await listHelper.UsersInDb()

        const newUser = {
            name: "Mika Leppiaho",
            username: "",
            password: "salasana"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await listHelper.UsersInDb()

        expect(response).toHaveLength(usersAtStart.length)
    })
    test('A user with invalid password is not added', async () => {
        const usersAtStart = await listHelper.UsersInDb()

        const newUser = {
            name: "Timo Testaaja",
            username: "tTestaaja",
            password: ""
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await listHelper.UsersInDb()

        expect(response).toHaveLength(usersAtStart.length)
    })
    test('A user with duplicate username is not added', async () => {
        const usersAtStart = await listHelper.UsersInDb()

        const newUser = {
            name: "Timo Testaaja",
            username: "mika",
            password: "salasana"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await listHelper.UsersInDb()

        expect(response).toHaveLength(usersAtStart.length)
    })

})

afterAll(() => {
    mongoose.connection.close()
})
