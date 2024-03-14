import React from 'react';

import LogoTitle from './LogoTitle';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import AccessibilityFooter from './AccessibilityFooter';

function HomePage() {

  let isSpeaking = false;
  const speakText = (text) => {
    const synth = window.speechSynthesis;

 
  if (isSpeaking) {
    synth.cancel();
    isSpeaking = false; 
    return; 
  }

  
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.onstart = () => {
    isSpeaking = true; 
  };
  utterThis.onend = () => {
    isSpeaking = false; 
  };
  utterThis.onerror = () => {
    isSpeaking = false; 
  };
  
  
  synth.speak(utterThis);
  };
  function speakSiblingText(event) {
   
    const cardText = event.target.closest('.card-body').querySelector('.card-text').textContent;
    const cardtitle = event.target.closest('.card-body').querySelector('.card-title').textContent;
    speakText(cardtitle+' . '+cardText);
  }

  return (
    <>
      <div>
        <LogoTitle />
      </div>
      <div id="main-content" className="main-content">
        <Container>
          <Row className="my-3">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Vision Statement</Card.Title>
                  <Button id='tts-button' style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }} variant="outline-light" onClick={speakSiblingText}>
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
      </div>

      <AccessibilityFooter />
    </>
  );
}

export default HomePage;
