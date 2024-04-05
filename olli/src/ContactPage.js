import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactPage.css';
import AccessibilityFooter from './AccessibilityFooter';



export const ContactPage = () => {
  const form = useRef();

  const [validation, setValidation] = useState({
    from_first_name: true,
    from_email: true,
    subject: true,
    message: true,
  });

  const validateForm = () => {
    const firstName = form.current.elements["from_first_name"].value.trim();
    const email = form.current.elements["from_email"].value.trim();
    const subject = form.current.elements["subject"].value.trim();
    const message = form.current.elements["message"].value.trim();

    const newValidation = {
      from_first_name: Boolean(firstName),
      from_email: Boolean(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email)),
      subject: Boolean(subject),
      message: Boolean(message),
    };

    setValidation(newValidation);

    // Only proceed if all values are true
    return Object.values(newValidation).every(Boolean);
  };

  const handleInputChange = (e) => {
    // When user starts typing, mark the field as valid
    setValidation({ ...validation, [e.target.name]: true });
  };


  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    const firstNameValue = form.current.elements["from_first_name"].value;
    const emailValue = form.current.elements["from_email"].value;
    const subjectValue = form.current.elements["subject"].value;
    const messageValue = form.current.elements["message"].value;


    if (firstNameValue.trim() && emailValue.trim() && subjectValue.trim() && messageValue.trim()) {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (emailRegex.test(emailValue)) {

        emailjs.sendForm('service_t239yhr', 'template_ipb2n28', form.current, 'aTJidWpAdceRveoZT')
          .then(
            (result) => {
              console.log('SUCCESS!', result.text);
              alert('Email sent successfully! Check your email for the message receipt.');
            },
            (error) => {
              console.log('FAILED...', error.text);
              alert('Email was not sent, retry.');
            },
          );
      } else {

        alert('Please enter a valid email address.');
      }
    } else {

      alert('Please fill out all required fields.');
    }
  };
  
  

  return (
    <div className="contact-page">

      <div className='contact-header'>
        <h1>Contact Us</h1>
        <p>Send us a message if you have any questions or comments!</p>
      </div>

      <div id="main-content" className="main-content">

        <div className = "contact-info-box">
          <h3>Our information: </h3>

          <h2>Phone number: </h2>
          <p>xxx-xxx-xxx</p>

          <h2>E-mail address: </h2>
          <p>ongoinglivinglearning@gmail.com</p>

          <h2>Address: </h2>
          <p>8685 Rockglen Rd. Arkona ON, N0M 1B0</p>

        </div>

        <div className="form-container">
          <form ref={form} onSubmit={sendEmail}>
            <div className="name-container">
              <div className="form-group">
                <label htmlFor="from_first_name">Name: *</label>
                <input type="text" className={`form-control ${!validation.from_first_name ? 'invalid' : ''}`} name="from_first_name" id="from_first_name" placeholder="First Name" onChange={handleInputChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="from_last_name"> *</label>
                <input type="text" className="form-control" name="from_last_name" id="from_last_name" placeholder="Last Name" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="from_email">Email address: *</label>
              <input type="email" className={`form-control ${!validation.from_email ? 'invalid' : ''}`} name="from_email" id="from_email" placeholder="ex. username@email.com" onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject: *</label>
              <input type="text" className={`form-control ${!validation.subject ? 'invalid' : ''}`} name="subject" id="subject" placeholder="What is the subject of your message?" onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message: *</label>
              <textarea name="message" id="message" className={`form-control ${!validation.message ? 'invalid' : ''}`} rows="4" placeholder="Enter your message here." onChange={handleInputChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>


      </div>

      <AccessibilityFooter />

    </div>
  );
  
};

export default ContactPage;