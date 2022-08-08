import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, ListGroup } from 'react-bootstrap'

const HomePage = () => {
  const blogs = useSelector((state) => state.blogs)
  if (!blogs) {
    return null
  }
  return (
    <div>
      <Container style={{ marginTop: 10 }}>
        <h3>Featured</h3>
        <ListGroup as="ul">
          {blogs.map((x) => (
            <ListGroup.Item as="li" key={x.id}>
              <Link to={`/blogs/${x.id}`}>{x.title}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  )
}

export default HomePage
