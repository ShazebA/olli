// FeedbackDisplay.js
import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const FeedbackDisplay = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
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

  return (
    <div>
      <h3>Feedback Received</h3>
      {feedbackList.map((feedback, index) => (
        <Card key={index} className="mb-3">
          <Card.Header>{feedback.name} - {new Date(feedback.datePosted).toLocaleDateString()}</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>{feedback.comment}</ListGroup.Item>
          </ListGroup>
        </Card>
      ))}
    </div>
  );
};

export default FeedbackDisplay;
