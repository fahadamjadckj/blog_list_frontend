import { useState } from 'react'

// import blogService from '../services/blogs'

const AddBlogForm = ({ hideBlogForm, createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const addBlog = (event) => {
    event.preventDefault()
    hideBlogForm()
    createBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create blog</h2>
      <div>
        title:
        <input
          id="title"
          type="text"
          name="title"
          value={newBlog.title}
          onChange={({ target }) => {
            setNewBlog({ ...newBlog, title: target.value })
          }}
        />
      </div>
      <div>
        author:
        <input
          id="author"
          type="text"
          name="author"
          value={newBlog.author}
          onChange={({ target }) => {
            setNewBlog({ ...newBlog, author: target.value })
          }}
        />
      </div>
      <div>
        url:
        <input
          id="url"
          type="text"
          name="url"
          value={newBlog.url}
          onChange={({ target }) => {
            setNewBlog({ ...newBlog, url: target.value })
          }}
        />
      </div>
      <div>
        <input type="submit" id="send" />
      </div>
    </form>
  )
}

export default AddBlogForm
