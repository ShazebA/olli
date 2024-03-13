import React, { useState } from 'react';

function NewsletterSignup() {

    const [formData, setFormData] = useState({ email: '', name: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    let name = formData.name.split(' ')
    if(!name[1]){
        name[1] = ''
    }
    try {
      const response = await fetch('api/newsletter/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          fName: name[0], 
          lName: name[1]
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Signed up for the newsletter successfully!');
      } else {
        alert(data.error || 'An error occurred while signing up for the newsletter.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while signing up for the newsletter.');
    }
  };

  return (
    <div className="tab-content custom-tab-content" align="center">
      <div className="subscribe-panel">
        <h1>Newsletter</h1>
        <p>Subscribe to our monthly Newsletter and stay tuned.</p>

        <form onSubmit={handleSubmit}>
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-envelope" aria-hidden="true"></i></span>
              <input type="email" className="form-control input-lg" name="email" id="email" placeholder="Enter your Email" onChange={handleChange} required /><br />
              <input type="text" className="form-control input-lg" name="name" id="name" placeholder="Enter your name" onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-4"></div>
          <br /><br /><br />
          <button type="submit" className="btn btn-warning btn-lg">Subscribe Now!</button>
        </form>
      </div>
    </div>
  );
}

export default NewsletterSignup;