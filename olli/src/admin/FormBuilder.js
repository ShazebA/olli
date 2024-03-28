import React, { useState, useEffect } from 'react';
import './FormBuilder.css';

const FormBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    description: '',
  });
  const [isAdmin, setIsAdmin] = useState(false);

  const token = sessionStorage.getItem('token');
  useEffect(() => {
  if (token) {
      fetch('/api/validateAdmin', { 
          method: 'POST',
          headers: {
              'authorization': token ,
              'Content-Type': 'application/json',
          },
      })
      .then(response => response.json())
      .then(data => setIsAdmin(data.isAdmin))
      .catch(error => console.error('Error validating admin status:', error));
  }
}, [token]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/waivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token},
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFormData({
            name: '',
            date: '',
            description: '',
            });
        alert('Waiver created successfully');
        // Handle successful response
      } else {
        const error = await response.json();
        console.error(error);
        alert('Error creating waiver');
        // Handle error
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="form-builder">
      <h2>Create Waiver</h2>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
        </div>
        <div className="form-group">
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </label>
        </div>
        <div className="form-group">
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
        </div>
        <div className="form-group">
      <button type="submit">Create Waiver</button>
        </div>
    </form>
    </div>);
};

export default FormBuilder;