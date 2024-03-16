import React, { useEffect, useState } from 'react';
import { Card, ListGroup,Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import './FeedbackDisplay.css';

const FeedbackDisplay = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); 
  const admin = localStorage.getItem('isAdmin');
  const token = localStorage.getItem('token')

  useEffect(() => {
    if(admin=='true'){
    
      setIsAdmin(true)
    }
    if (token) {
      fetch('/api/validateAdmin', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => setIsAdmin(data.isAdmin))
      .catch(error => console.error('Error validating admin status:', error));
    }

    const fetchFeedback = async () => {
      try {
        const response = await fetch('/feedback/feedback');
        const data = await response.json();
        setFeedbackList(data);
      } catch (error) {
        console.error('Failed to fetch feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

    const handleDeleteFeedback = (name, comment) => {
      
      fetch('/feedback/feedback', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
        
        body: JSON.stringify({ name, comment }),
      })
      .then(response => {
        if (response.ok) {
          alert("Comment successfully deleted!")
          setFeedbackList(feedbackList.filter(f => f.name !== name || f.comment !== comment));

        } else {
          throw new Error('Failed to delete feedback');
        }
      })
      .catch(error => console.error('Error deleting feedback:', error));
    };

  

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} color="#ffc107" />);
    }
    return stars;
  };

  return (
    <div className="feedback-container">
      <h3>Feedback Received</h3>
      {feedbackList.map((feedback, index) => (
        <Card key={index} className="mb-3 feedback-card">
          <Card.Header className="feedback-card-header">{feedback.name} - {new Date(feedback.datePosted).toLocaleDateString()}</Card.Header>
          <Card.Body className="feedback-card-rating">
            <div>Rating:</div>
            {renderStars(feedback.starRating)}
            
          </Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item className="feedback-list-group-item">{feedback.comment}</ListGroup.Item>
          </ListGroup>
          {isAdmin && (
              <Button variant="danger" size="sm" onClick={() => handleDeleteFeedback(feedback.name, feedback.comment)} style={{ width:'100px'}}>
                Delete
                
              </Button>
            )}
        </Card>
      ))}
    </div>
  );
};

export default FeedbackDisplay;
