import React, { useState } from "react";
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

export default function Login({setToken}) {
  const [userData, setUserData] = useState({email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  async function loginUser() {
    return fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: userData.email, password: userData.password})
    })
    .then(response => {
      
      const statusCode = response.status;
      return response.json().then(data => {
        return { statusCode, ...data };
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
    if(token){
      let parse = parseJwt(token.accessToken)
      console.log(parse)
      
      if(parse.isAdmin==true){
        alert('Login successful!')
        setToken(token)
        navigate('/dashboard')
      }
    }
    
  }


  return (
    <form onSubmit={handleLoginSubmit}>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' name="email" required onChange={handleChange}/>
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name="password" required onChange={handleChange}/>

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
    </form>
    
        
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

