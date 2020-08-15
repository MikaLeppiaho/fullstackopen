//Jäin tehtävään 5.10*: blogilistan frontend, step10

import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [errorMessage, setErrorMessage] = useState(null)
  //haetaan kaikki blogit kun ikkuna renderöityy
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs( blogs.sort((a,b) => b.likes-a.likes) )
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUser = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    }
    loggedUser()

  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (e) {
      setErrorMessage('There was an error logging in user ')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try{
      window.localStorage.clear()
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorMessage('There was a problem logging out user ')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }

  const addNewBlog = async ( blogObject ) => {
    try{
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.postBlog(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added!`)
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    } catch (e) {
      setErrorMessage('There was a problem with adding a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
      console.log('Error', e)
    }
  }

  const removeBlog = async ( blogId ) => {
    try {
      if (window.confirm('Do you really want to remove this blog?')){
        await blogService.removeBlog(blogId)
        setBlogs(blogs.filter(blog => blog.id !== blogId))
      }

    } catch (e) {
      setErrorMessage('There was an error removing the blog')
    }
  }

  const updateLikesOnBlog = async ( id, blogObject ) => {
    console.log(`BlogID to update ${id}\n blogObject ${JSON.stringify(blogObject)}`)
    try {
      const returnedBlog = await blogService.likeBlog(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog).sort((a,b) => b.likes-a.likes))
      console.log(returnedBlog)

    } catch (e) {
      setErrorMessage('There was a problem with updating a like')
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm
        username      =   {username}
        password      =   {password}
        setUsername   =   {setUsername}
        setPassword   =   {setPassword}
        handleLogin   =   {handleLogin}
      />
    </Togglable>

  )


  const newBlogForm = () =>  (
    <Togglable buttonLabel='Create new' ref={blogFormRef}>
      <NewBlogForm
        addNewBlog = {addNewBlog}
      />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={errorMessage}
      />

      {user
        ?
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {newBlogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id}
              blogs = {blog}
              updateLikesOnBlog = {updateLikesOnBlog}
              removeBlog        = {removeBlog}
              user              = {user}
            /> )}

        </div>
        :loginForm()
      }

    </div>
  )
}

export default App