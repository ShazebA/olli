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

import chameleonIcon from './icons/chameleon.png'; 
import chickIcon from './icons/chick.png';
import frogIcon from './icons/frog.png';
import parrotIcon from './icons/parrot.png';
import peacockIcon from './icons/peacock.png';
import pigIcon from './icons/pig.png';
import sharkIcon from './icons/shark.png';
import squirrelIcon from './icons/squirrel.png';

export default function Login({ setToken }) {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isParent, setIsParent] = useState(false);

  // added for switch between login form types 
  const [loginType, setLoginType] = useState('parentStaff'); // default to 'parentStaff' or 'dependant'

  const [selectedUsernameColor, setSelectedUsernameColor] = useState(null);
  const [selectedIcons, setSelectedIcons] = useState([]);

  // defining colours and icons
  const colors = ['#FF6B6B', '#FFA560', '#FFE66D', '#88D498', '#6CB2FF', '#7A82AB', '#C492FF', '#FF9CEE', '#5AD2F4', '#edac44'];
  const icons = ['chameleon', 'chick', 'frog', 'parrot', 'peacock', 'pig', 'shark', 'squirrel'];



  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);


  useEffect(() => {

    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');
    const isParent = localStorage.getItem('isParent');
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(isAdmin);
    }

    if (isAdmin) {
      setIsAdmin(true);
      console.log("isAdmin");
    } else if (isParent) {
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
      body: JSON.stringify({ email: userData.email, password: userData.password })
    })
      .then(response => {

        return response.json().then(data => {
          return { ...data };
        });
      });
  }


  function parseJwt(token) {
    try {

      const base64Url = token.split('.')[1];

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  const handleColorSelect = (color) => {
    setSelectedUsernameColor(color);
  };

  const handleIconSelect = (icon) => {
    if (selectedIcons.includes(icon)) {
      setSelectedIcons(selectedIcons.filter(selectedIcon => selectedIcon !== icon));
    } else if (selectedIcons.length < 4) {
      setSelectedIcons([...selectedIcons, icon]);
    }
  };


  const handleDependantLoginSubmit = async (e) => {
    e.preventDefault();
    console.log('Dependant Username Color:', selectedUsernameColor);
    console.log('Dependant Password Icons:', selectedIcons);
  
    if (selectedUsernameColor && selectedIcons.length === 4) {
      alert('Login successful!');
    } else {
      alert('Please select one username color and four icons.');
    }
  };


  const handleLoginSubmit = async e => {
    e.preventDefault();
    const token = await loginUser()
    console.log(token)
    if (token) {
      let parse = parseJwt(token.accessToken)

      if (parse.isAdmin === true) {
        alert('Login successful!')
        localStorage.setItem('token', token.accessToken);
        localStorage.setItem('isAdmin', isAdmin);
        navigate('/dashboard')
        return;
      } else if (parse.isParent === true)
        alert('Login successful!')
      localStorage.setItem('token', token.accessToken);
      localStorage.setItem('isParent', isParent);
      navigate('/parent')
      return;
    }

  }

  const switchLoginForm = (type) => {
    setLoginType(type);
  };

  const iconImages = {
    chameleon: chameleonIcon,
    chick: chickIcon,
    frog: frogIcon,
    parrot: parrotIcon,
    peacock: peacockIcon,
    pig: pigIcon,
    shark: sharkIcon,
    squirrel: squirrelIcon
  };


  const renderLoginForm = () => {
    if (loginType === 'parentStaff') {
      return (
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
      );
    } else if (loginType === 'dependant') {
      return (
        <MDBContainer>
          <form onSubmit={handleDependantLoginSubmit}>
            {/* username colours */}
            <h3 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '50px', marginBottom: '5px' }}>Username:</h3>
            <h3 style={{ textAlign: 'center', fontSize: '25px', marginTop: '0px', marginBottom: '30px'}}>Select your username colour.</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gridGap: '10px',
              marginBottom: '30px',
              justifyContent: 'center',
              justifyItems: 'center'
            }}>
              {colors.map(color => (
                <div
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: color,
                    border: selectedUsernameColor === color ? '4px solid black' : '2px solid black',
                    cursor: 'pointer',
                    margin: '0px',
                    borderRadius: '8px'
                  }}
                ></div>
              ))}
            </div>

            {/* animal icons password */}
            <h3 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '50px', marginBottom: '5px'}}>Password:</h3>
            <h3 style={{ textAlign: 'center', fontSize: '25px', marginTop: '0px', marginBottom: '30px' }}>Select four icons as your password.</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridGap: '10px',
              marginBottom: '20px',
              justifyContent: 'center',
              justifyItems: 'center'
            }}>
              {icons.map(icon => (
                <img
                  key={icon}
                  src={iconImages[icon]}
                  alt={icon}
                  onClick={() => handleIconSelect(icon)}
                  style={{
                    borderRadius: '8px',
                    border: selectedIcons.includes(icon) ? '4px solid black' : 'none',
                    cursor: 'pointer',
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover'
                  }}
                />
              ))}
            </div>

            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <Button variant="success" size="lg" type="submit">
                Log In
              </Button>
            </div>
            <div style={{height: '150px', width: '100%'}}></div>
          </form>
        </MDBContainer>

      );
    }
  };


  return (
    <div>
      {/* buttons to switch between login forms */}
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
        <Button variant="primary" onClick={() => switchLoginForm('parentStaff')} style={{backgroundColor: '#617243', marginRight: '10px'}}>Caregiver Login</Button>
        <Button variant="secondary" onClick={() => switchLoginForm('dependant')} style={{backgroundColor: '#617243', marginLeft: '10px'}}>Participants Login</Button>
      </div>

      {/* renders the correct form based on the login type chosen */}
      {renderLoginForm()}

      <AccessibilityFooter />
    </div>

  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

