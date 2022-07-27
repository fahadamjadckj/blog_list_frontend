import Blog from './Blog'
const Blogs = ({ blogs }) => {

  // sorts the blog posts in descending order
  const sorted = blogs.sort((a, b) => {
    if(a.likes < b.likes) {
      return 1
    }
    else if(a.sorted > b.likes) {
      return -1
    }

    return 0
  })
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