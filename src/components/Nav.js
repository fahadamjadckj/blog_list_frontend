/* eslint-disable no-unused-vars */
// import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

const style = {
  padding: 5
}

const Navigation = () => {
  return (
    <Navbar bg="light" expand="sm" variant="light">
      <Container>
        <Navbar.Brand href="/"> Radon </Navbar.Brand>
        <Navbar.Toggle aria-controls="nv" />
        <Navbar.Collapse id="nv">
          <Nav.Link href="/" style={style}>
            Home
          </Nav.Link>
          <Nav.Link href="/users" style={style}>
            Users
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
