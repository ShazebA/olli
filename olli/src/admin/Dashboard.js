import React,{useState,useEffect} from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom'; 
import { Navbar, Nav ,NavDropdown} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import DashboardHome from './DashboardHome';
import Gallery from '../Gallery';
import EventsPage from '../EventsPage';
import ManageUser from './ManageUser'
import Register from './Register';
import FeedbackDisplay from './FeedbackDisplay'; 
import Chat from '../chat/Chat';
import ClockInfo from './ClockInfo';
import FormBuilder from './FormBuilder';
import io from 'socket.io-client'
import { MDBCard } from 'mdb-react-ui-kit';
import './Dashboard.css'
import NewsletterSubscribers from './NewsletterSubscribers';



const socket = io('http://localhost:8080')

function Dashboard() {
  const navigate = useNavigate();


  function logoutUser(){
    let decision = window.confirm('Are you sure you want to log out?')
    if(decision){
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
    navigate('/')
    }
    else{
      return ;
    }
    

  }

  function ActiveUsersCounter() {
    const [activeUsers, setActiveUsers] = useState(0);

    useEffect(() => {
        socket.on('active users', (count) => {
            setActiveUsers(count);
        });

        return () => {
            socket.off('active users');
        };
    }, []);

    return <div>Active users: {activeUsers}</div>;
}


  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <MDBCard id='activeUsers'>
                <ActiveUsersCounter></ActiveUsersCounter>
              </MDBCard>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              <Nav.Link as={Link} to="/dashboard">Dashboard Home</Nav.Link>
              <Nav.Link as={Link} to="/dashboard/gallery">Gallery</Nav.Link>
              <Nav.Link as={Link} to="/dashboard/events">Events</Nav.Link>
              <Nav.Link as={Link} to="/dashboard/chat">Chat</Nav.Link>
              <Nav.Link as={Link} to="/dashboard/manage">Manage Users</Nav.Link>
              <Nav.Link as={Link} to="/dashboard/register">Register Account</Nav.Link>
              <Nav.Link as={Link} to="/dashboard/formbuilder">Form Builder</Nav.Link>
              <Nav.Link as={Link} to="/dashboard/clockinfo">Clock Info</Nav.Link>
              <Nav.Link as={Link} to="/dashboard/subscribers">Subscribers</Nav.Link>
              <Nav.Link as={Link} to="/dashboard/feedback">Feedback</Nav.Link> 
              
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
        <Route path="manage" element={<ManageUser/>} />
        <Route path="register" element={<Register />} />
        <Route path="formbuilder" element={<FormBuilder />} />
        <Route path="clockinfo" element={<ClockInfo/>} />
        <Route path='subscribers' element={<NewsletterSubscribers></NewsletterSubscribers>}/>
        <Route path="feedback" element={<FeedbackDisplay />} /> 

      </Routes>
    </div>
  );
}

export default Dashboard;
