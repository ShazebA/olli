import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './style.css';


import Login from './Login';
import HomePage from './HomePage';
import EventsPage from './EventsPage';
import Register from './Register';
import Contacts from './ContactPage';
import Gallery from './Gallery';
import Dashboard from "./admin/Dashboard";
import NewsletterSignup from './NewsletterSignup';
import About from './About';




function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.accessToken;
}

  
function NavigationBar({ toggleTheme }) {
  const location = useLocation();
  const token = getToken();

  return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link> {/* New About link */}
              <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
              <Nav.Link as={Link} to="/events">Events</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              {!token && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
              <Nav.Link as={Link} to="/signup">Newsletter</Nav.Link>
            </Nav>
            <button onClick={toggleTheme} style={{ marginLeft: 'auto' }}>Light/Dark Mode</button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
  );
}

function App() {

   // State for managing theme
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // UseEffect to update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(currentTheme => currentTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div className={theme === 'light' ? 'light-theme' : 'dark-theme'}>
      
      <Routes>
        <Route path="/" element={<><NavigationBar toggleTheme={toggleTheme} /><HomePage /></>} />
        <Route path="/about" element={<><NavigationBar toggleTheme={toggleTheme} /><About /></>} />
        <Route path="/login" element={<><NavigationBar toggleTheme={toggleTheme} /><Login setToken={setToken} /></>} />
        <Route path="/events" element={<><NavigationBar toggleTheme={toggleTheme} /><EventsPage /></>} />
        <Route path="/contact" element={<><NavigationBar toggleTheme={toggleTheme} /><Contacts /></>} />
        <Route path="/gallery" element={<><NavigationBar toggleTheme={toggleTheme} /><Gallery /></>} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/signup" element={<><NavigationBar toggleTheme={toggleTheme} /><NewsletterSignup /></>} />
      </Routes>
    </div>
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
