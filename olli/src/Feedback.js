import React from 'react';
import {useState} from 'react';
import { MDBContainer, MDBRating } from 'mdbreact';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import FeedbackForm from './FeedbackForm'; 
import FeedbackDisplay from './admin/FeedbackDisplay'
import  './admin/FeedbackDisplay.css'



import AccessibilityFooter from './AccessibilityFooter';

const Feedback = () => {
  

  return (
    <MDBContainer>
    
        
        <Row className="my-3">
          <Card>
                <Card.Body>
                  <Card.Title>Feedback</Card.Title>
                 <Card.Text>

                 
                 
                  </Card.Text>
                  <Col>
                  <FeedbackForm />
                </Col>
                </Card.Body>
              </Card>
             <FeedbackDisplay></FeedbackDisplay>
          </Row>
          
    </MDBContainer>

    
  );
};

export default Feedback;