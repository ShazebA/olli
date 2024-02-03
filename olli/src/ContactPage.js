import React, { useState } from 'react';
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBValidation,
  MDBValidationItem,
  MDBTextArea
} from 'mdb-react-ui-kit';

function Contacts() {
  // State for form fields
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    sendCopy: false,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        // If the server responds with a success status, clear the form or notify the user
        console.log('Contact form submitted successfully');
        setFormValues({ name: '', email: '', subject: '', message: '', sendCopy: false }); // Reset form state
        alert('Thank you for contacting us!');
      } else {
        // Handle server-side validation errors or other issues
        const errorData = await response.json();
        alert('Failed to submit contact form:', errorData.message);
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      console.error('There was an error submitting the contact form:', error);
      alert('Error submitting form. Please try again later.');
    }
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <MDBValidation noValidate id='contact-form' className='d-flex flex-column align-items-center' style={{ width: '100%', maxWidth: '500px' }}>

        <h2>Contact us at O.L.L.I.</h2>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '700px' }}>
          <MDBValidationItem invalid feedback='Please provide your name.'>
            <label htmlFor='name'>Full name</label>
            <MDBInput name='name' value={formValues.name} required onChange={handleInputChange} />
          </MDBValidationItem>

          <MDBValidationItem invalid feedback='Please provide your email.'>
            <label htmlFor='email'>Email address</label>
            <MDBInput type='email' name='email' value={formValues.email} required onChange={handleInputChange} />
          </MDBValidationItem>

          <MDBValidationItem invalid feedback='Please provide mail subject.'>
            <label htmlFor='subject'>Subject</label>
            <MDBInput name='subject' value={formValues.subject} required onChange={handleInputChange} />
          </MDBValidationItem>
        </div>

        <div style={{ width: '700px', minHeight: '100px' }}> {/* Adjust the minHeight to your preference */}
          <MDBValidationItem invalid feedback='Please provide a message text.'>
            <label htmlFor='message'>Message</label>
            <MDBTextArea
              name='message'
              value={formValues.message}
              required
              onChange={handleInputChange}
              style={{ width: '100%', minHeight: '100px' }} // Use minHeight to set initial size
            />
          </MDBValidationItem>
        </div>

        <MDBValidationItem feedback=''>
          <MDBCheckbox name='sendCopy' checked={formValues.sendCopy} label='Send me a copy' onChange={handleInputChange} />
        </MDBValidationItem>

        <MDBBtn type='submit' color='primary' block className='my-4' onClick={handleSubmit}>
          Send
        </MDBBtn>
      </MDBValidation>
    </div >
  );
}

export default Contacts;
