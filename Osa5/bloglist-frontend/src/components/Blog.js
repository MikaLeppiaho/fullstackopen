import React, { useState } from 'react'


const Blog = ({
  blogs,
  updateLikesOnBlog,
  removeBlog,
  user
}) => {
  const [moreInfo, setMoreInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetailVisibility = () => {
    setMoreInfo(!moreInfo)
  }

  const updateLikes = (id, blogObject) => {
    const updatedBlog = {
      title:blogObject.title,
      author:blogObject.author,
      url:blogObject.url,
      likes: blogObject.likes+1
    }
    updateLikesOnBlog(id, updatedBlog)
  }


  const simpleBlog = () => (
    <p>
      {blogs.title} {blogs.author} <button onClick={toggleDetailVisibility}>view</button>
    </p>
  )

  const detailedBlog = () => {
    console.log('detail blog: ', blogs.user[0].username, user.username)

    return (
      <div>

        <ul>
          <li>{blogs.title} <button onClick={toggleDetailVisibility}>hide</button></li>
          <li>{blogs.url}</li>
          <li>likes {blogs.likes} <button onClick={() => updateLikes(blogs.id, blogs)}>like</button></li>
          <li>{blogs.author}</li>
          { blogs.user[0].username === user.username
            ?<button onClick={() => removeBlog(blogs.id)}>remove</button>
            :<div></div>
          }

        </ul>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {
        moreInfo
          ? detailedBlog()
          : simpleBlog()
      }
    </div>
  )
}




export default Blog
