import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppNavbar() {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          ProdManage
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="mx-2 fw-semibold text-dark">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="mx-2 fw-semibold text-dark">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="mx-2 fw-semibold text-dark">
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="mx-2 fw-semibold text-dark">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
