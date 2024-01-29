import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Login from './Login'; 
import EventsPage from './EventsPage';
import Register from './Register';

function HomePage() {
  return (
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
              <Nav.Link as={Link} to="/events">Events</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<EventsPage/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default HomePage;
