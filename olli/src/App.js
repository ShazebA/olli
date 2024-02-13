
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';


import Login from './Login';
import HomePage from './HomePage';
import EventsPage from './EventsPage';
import Register from './Register';
import Contacts from './ContactPage';
import Gallery from './Gallery';
import Dashboard from "./admin/Dashboard";
import NewsletterSignup from './NewsletterSignup';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.accessToken;
}


function NavigationBar() {
  
  const token = getToken();

  return (
    
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
              <Nav.Link as={Link} to="/events">Events</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              {!token && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
              <Nav.Link as={Link} to="/signup">Newsletter</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
  );
}

function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<><NavigationBar /><HomePage /></>} />
        <Route path="/login" element={<><NavigationBar /><Login setToken={setToken} /></>} />
        <Route path="/events" element={<><NavigationBar /><EventsPage /></>} />
        <Route path="/register" element={<><NavigationBar /><Register /></>} />
        <Route path="/contact" element={<><NavigationBar /><Contacts /></>} />
        <Route path="/gallery" element={<><NavigationBar /><Gallery /></>} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/signup" element={<><NavigationBar /><NewsletterSignup /></>} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
