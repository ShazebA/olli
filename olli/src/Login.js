import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn
}

from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'; 
import PropTypes from 'prop-types'

import AccessibilityFooter from './AccessibilityFooter';

export default function Login({setToken}) {
  const [userData, setUserData] = useState({email: '', password: '' });
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [isParent,setIsParent] =  useState(false);


  useEffect(() => {
    
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);


  useEffect(() => {
    
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin'); 
    const isParent =  localStorage.getItem('isParent')
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(isAdmin);
    }

    if (isAdmin) {
      setIsAdmin(true);
      console.log("isAdmin");
    }else if(isParent){
      setIsParent(true)
      console.log('isParent')
    }
  }, []);


  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  async function loginUser() {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: userData.email, password: userData.password})
    })
    .then(response => {
      
      return response.json().then(data => {
        return {...data };
      });
    });
  }
  

   function parseJwt(token) {
    try {
     
        const base64Url = token.split('.')[1];
        
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
       
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null; 
    }
}


  

  const handleLoginSubmit = async e => {
    e.preventDefault();
    const token = await loginUser()
    console.log(token)
    if(token){
      let parse = parseJwt(token.accessToken)
      
      if(parse.isAdmin===true){
        alert('Login successful!')
        localStorage.setItem('token', token.accessToken);
        localStorage.setItem('isAdmin', isAdmin);
        navigate('/dashboard')
        return;
      }else if(parse.isParent===true)
      alert('Login successful!')
      localStorage.setItem('token', token.accessToken);
      localStorage.setItem('isParent', isParent);
      navigate('/parent')
      return;
    }
    
  }


  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <div id="main-content" className="main-content">
          <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' name="email" required onChange={handleChange} />
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name="password" required onChange={handleChange} />

            <div className="d-flex justify-content-between mx-3 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a href="!#">Forgot password?</a>
            </div>

            <Button variant="primary" size="lg" type='submit'>
              SIGN IN
            </Button>

            <div className="text-center">


            </div>

          </MDBContainer>
        </div>
      </form>
      <AccessibilityFooter />
    </div>

  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

