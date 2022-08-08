import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = () => {
  // sorts the blog posts in descending order

  const blogs = useSelector((state) => state.blogs)
  const sorted = [...blogs].sort((a, b) => {
    return b.likes - a.likes
  })

  if (blogs === '') {
    return (
      <div>
        <p>No blogs to show!</p>
      </div>
    )
  } else {
    const toBeDisplayed = sorted.map((blog) => (
      <Blog key={blog.id} blogData={blog} />
    ))
    return toBeDisplayed
  }
}

export default Blogs
