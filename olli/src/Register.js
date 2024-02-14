import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}

from 'mdb-react-ui-kit';

function Register() {

  const [userData, setUserData] = useState({email: '', password: '',isParent:false,isDependent:false,name:''});
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangeCheck = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({ 
      ...userData, 
      [name]: type === 'checkbox' ? checked : !value,
    });
    
  };
  const handleChange = (e)=>{
    setUserData({ ...userData, [e.target.name]: e.target.value });
   
  }
  

  const handleRegister = async (e)=>{
    const name = userData.name.split(' ')
    if(!name[1]){
        name[1] = ' '
    }
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          passwordHash: userData.password,
          isParent:userData.isParent,
          isDependent:userData.isDependent,
          fName: name[0],
          lName: name[1]
        }),
      });

      if (response.ok) {
        
        alert("Registration successful! You'll be brought back to the home screen.")
        

      } else {
        alert("Registration failed: please try again!")
      }
    } catch (error) {

      console.error('Error:', error);
      
    }
  }

  return (
    
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput name='name' label='Your Name' id='form1' type='text' className='w-100' onChange={handleChange}/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput name='email'label='Your Email' id='form2' type='email' onChange={handleChange}/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput  name='password' label='Password' id='form3' type='password'  onChange={handleChange} />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput name='password' label='Repeat your password' id='form4' type='password' required onChange={e => setConfirmPassword(e.target.value)}/>
                
              </div>

              <div className='mb-4'>
                <label>Parent or dependent?</label>
                <MDBCheckbox name='isParent' value='' id='flexCheckParent' label='Parent' onChange={handleChangeCheck} />
                <MDBCheckbox name='isDependent' value='' id='flexCheckDependent' label='Dependent' onChange={handleChangeCheck} />

              </div>

              

              <MDBBtn className='mb-4' size='lg' onClick={handleRegister}>Register</MDBBtn>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='OLLI-LOGO.png' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
    
  );
}

export default Register;