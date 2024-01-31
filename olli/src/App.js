import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import Login from './Login';
import HomePage from './HomePage'
import EventsPage from './EventsPage';
import Register from './Register';
import Contacts from './ContactPage';
import Gallery from './Gallery';


function App() {
  return (
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          
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
      <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<EventsPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/contact" element={<Contacts/>} />
        <Route path="/gallery" element={<Gallery/>} />

      </Routes>
    </Router>
  );
}

export default App;
