import React, { useState } from 'react'
const NewBlog = ({ addNewBlog }) => {
  const [blogTitle,   setBlogTitle]    = useState('')
  const [blogAuthor,  setBlogAuthor]   = useState('')
  const [blogUrl,     setBlogUrl]      = useState('')

  const createNewBlog = (event) => {
    event.preventDefault()

    addNewBlog({
      title : blogTitle,
      author: blogAuthor,
      url   : blogUrl,
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <p> Create new </p>
      <form onSubmit={createNewBlog}>
        <div>title
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          /></div>
        <div>author
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}/></div>
        <div>url
          <input
            type="text"
            value={blogUrl}
            name="url"
            onChange={({ target }) => setBlogUrl(target.value)}/>
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default NewBlog