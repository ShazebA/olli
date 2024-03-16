// FeedbackForm.js
import React, { useState } from 'react';
import Rating from './Rating';
import { Form, Button, Alert } from 'react-bootstrap';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({ name: '', comment: '' ,starRating:0});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
    console.log(feedback)
  };

  const handleRatingChange = (rating) => {
    setFeedback({ ...feedback, starRating: rating });
    console.log(feedback)
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/feedback/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });
      if (response.ok) {
        setShowAlert(true);
        setFeedback({ name: '', comment: '' ,starRating:0}); // Reset form
        setTimeout(() => setShowAlert(false), 5000); // Hide alert after 5 seconds
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  return (
    <div>
      {showAlert && <Alert variant="success">Feedback submitted successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={feedback.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Rating onRating={handleRatingChange}></Rating>
        
        <Form.Group className="mb-3">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your comment"
            name="comment"
            value={feedback.comment}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FeedbackForm;
