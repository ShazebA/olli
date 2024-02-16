import React from 'react';

import LogoTitle from './LogoTitle';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

function HomePage() {

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    // Cancel the current speech synthesis before starting a new one
    synth.cancel();
    const utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  };
  const visionStatement="To be a community of inclusion and a circle of friendship that supports and enhances the lives of our loved ones with intellectual disabilities as well as the whole family."

  return (
    <>
      <div>
        <LogoTitle /> 
      </div>
      <Container>
        <Row className="my-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Vision Statement</Card.Title>
                <Button  id= 'tts-button' style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }} variant="outline-light" onClick={() => speakText(visionStatement)}>
                <FontAwesomeIcon icon={faVolumeUp} color='black' />
              </Button>
                <Card.Text>
                  To be a community of inclusion and a circle of friendship that supports
                  and enhances the lives of our loved ones with intellectual disabilities as
                  well as the whole family.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card></Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
