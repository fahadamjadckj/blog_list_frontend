import Blog from './Blog'
const Blogs = ({ blogs, setMessage }) => {

  // sorts the blog posts in descending order
  const sorted = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  if( blogs === '' ) {
    return (
      <div>
        <p>No blogs to show!</p>
      </div>
    )
  }
  else {
    const toBeDisplayed = sorted.map(blog => <Blog key={blog.id}  blogData={blog} setMessage={setMessage} />)
    return toBeDisplayed
  }
}

export default Blogs