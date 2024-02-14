import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import './ContactPage.css';


export const ContactPage = () => {
  const form = useRef();


  const sendEmail = (e) => {
    e.preventDefault();
  
    // do not put these values directly into chatGPT 
    emailjs.sendForm('service_t239yhr', 'template_ipb2n28', form.current, 'aTJidWpAdceRveoZT') 
   
    .then(
      (result) => {
        console.log('SUCCESS!', result.text);
      },
      (error) => {
        console.log('FAILED...', error.text);
      },
    );
  };

  return (
    <div className="form-container">
      <form ref={form} onSubmit={sendEmail}>
        <div className="form-group">
          <label htmlFor="from_name">Name</label>
          <input type="text" className="form-control" name="from_name" id="from_name" />
        </div>
        <div className="form-group">
          <label htmlFor="from_email">Email Address</label>
          <input type="email" className="form-control" name="from_email" id="from_email" />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" className="form-control" name="subject" id="subject" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" className="form-control" rows="4"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
  
};

export default ContactPage;