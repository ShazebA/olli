import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

// Assuming these components are defined elsewhere in your project
import Login from './Login';
import HomePage from './HomePage';
import EventsPage from './EventsPage';
import Register from './Register';
import Contacts from './ContactPage';
import Gallery from './Gallery';
import Dashboard from "./Dashboard";

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.accessToken;
}

// NavigationBar component to use useLocation hook correctly
function NavigationBar() {
  const location = useLocation();
  const token = getToken();

  return (
    location.pathname !== '/dashboard' && (
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
}

function App() {
  return (
    <>
      <Routes>
        {/* NavigationBar is included outside of Routes to ensure it renders independently of the current route */}
        <Route path="/" element={<><NavigationBar /><HomePage /></>} />
        <Route path="/login" element={<><NavigationBar /><Login setToken={setToken} /></>} />
        <Route path="/events" element={<><NavigationBar /><EventsPage /></>} />
        <Route path="/register" element={<><NavigationBar /><Register /></>} />
        <Route path="/contact" element={<><NavigationBar /><Contacts /></>} />
        <Route path="/gallery" element={<><NavigationBar /><Gallery /></>} />
        <Route path="/dashboard" element={<Dashboard />} />
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
