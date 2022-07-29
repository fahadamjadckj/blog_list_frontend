import Blog from './Blog'
const Blogs = ({ blogs }) => {

  // sorts the blog posts in descending order
  console.log('blogs', blogs)
  const sorted = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  console.log('sorted', sorted)
  if( blogs === '' ) {
    return (
      <div>
        <p>No blogs to show!</p>
      </div>
    )
  }
  else {
    const toBeDisplayed = sorted.map(blog => <Blog key={blog.id}  blogData={blog} />)
    return toBeDisplayed
  }
}

export default Blogs