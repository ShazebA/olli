import React, { useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn
}
from 'mdb-react-ui-kit';

function Login() {
  const [userData, setUserData] = useState({email: '', password: '' });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password
        }),
      });

      if (response.ok) {
        
        alert("Login Successful")
        
      } else {
        alert("Login Failed: Incorrect Password")
        
      }
    } catch (error) {
      console.error('Error:', error);
      
    }
  };


  return (
    
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' name="email" required onChange={handleChange}/>
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name="password" required onChange={handleChange}/>

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn className="mb-4" onClick={handleLoginSubmit}>Sign in</MDBBtn>

      <div className="text-center">
        <p>Not a member? <a href="./Register">Register</a></p>
    
      </div>

    </MDBContainer>
        
  );
}

export default Login;