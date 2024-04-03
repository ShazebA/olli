import React from 'react';

import LogoTitle from './LogoTitle';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import AccessibilityFooter from './AccessibilityFooter';
import caregiver from './images/CAREGIVER.png';
import ofa from './images/OFA.png';
import rockglen from './images/ROCKGLEN.png';
import sunset from './images/SUNSET.png';

import './style.css'; // Importing the CSS file for styles

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
    utterThis.onstart = () => isSpeaking = true;
    utterThis.onend = () => isSpeaking = false;
    utterThis.onerror = () => isSpeaking = false;
    synth.speak(utterThis);
  };

  function speakSiblingText(event) {
    const cardText = event.target.closest('.card-body').querySelector('.card-text').textContent;
    const cardTitle = event.target.closest('.card-body').querySelector('.card-title').textContent;
    speakText(cardTitle + ' . ' + cardText);
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
              <Card id='sponsors-card'>
                <Card.Body>
                  <h1 className="title-fall">Our Sponsors</h1>
                  <Row>
                    <Col xs={6} md={3}>
                      <a href='https://ontariocaregiver.ca/' target="_blank" rel="noreferrer"><img src={caregiver} alt="Caregiver" className="img-fluid" /></a>
                    </Col>
                    <Col xs={6} md={3}>
                      <a href='https://www.orderalhambra.org/' target="_blank" rel="noreferrer"><img src={ofa} alt="OFA" className="img-fluid"  /></a>
                    </Col>
                    <Col xs={6} md={3}>
                     <a href='https://www.rockglen.com/' target="_blank" rel="noreferrer"><img src={rockglen} alt="Rockglen" className="img-fluid" /></a> 
                    </Col>
                    <Col xs={6} md={3}>
                     <a href='https://sunsetcommunityfoundation.ca/' target="_blank" rel="noreferrer"> <img src={sunset} alt="Sunset" className="img-fluid" /></a> 
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <AccessibilityFooter />
    </>
  );
}

export default HomePage;
