import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { Navbar, Nav ,NavDropdown} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import DashboardHome from '../admin/DashboardHome';
import Gallery from '../Gallery';
import EventsPage from '../EventsPage';
import Chat from '../chat/Chat';
import Waivers from './Waivers';
import Clock from './Clock'


function Parent() {
  const navigate = useNavigate();

  function logoutUser(){
    let decision = window.confirm('Are you sure you want to log out?')
    if(decision){
      sessionStorage.removeItem('token');
    navigate('/')
    }
    else{
      return ;
    }
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/parent">Dashboard Home</Nav.Link>
              <Nav.Link as={Link} to="/parent/gallery">Gallery</Nav.Link>
              <Nav.Link as={Link} to="/parent/clock">Clock</Nav.Link>
              <Nav.Link as={Link} to="/parent/events">Events</Nav.Link>
              <Nav.Link as={Link} to="/parent/waivers">Waivers</Nav.Link>
              <Nav.Link as={Link} to="/parent/chat">Chat</Nav.Link>
              
              
            </Nav>
            <Nav className="justify-content-end">
              <NavDropdown title="Account Info" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
                
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<DashboardHome />} /> 
        <Route path="gallery" element={<Gallery />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="chat" element={<Chat />} />
        <Route path="waivers" element={<Waivers />} />
        <Route path="clock" element={<Clock/>} />

      </Routes>
    </div>
  );
}

export default Parent;
