import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import image2 from "./istockphoto-1358014313-1024x1024.jpg"
import image3 from "./istockphoto-486325400-612x612.jpg"
import image4 from "./istockphoto-1168454133-1024x1024.jpg"
import image5 from "./istockphoto-539281953-612x612.jpg"
import image6 from "./istockphoto-1324653833-612x612.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Gallery = () => {
  const speakText = (text) => {
    const synth = window.speechSynthesis;
    // Cancel the current speech synthesis before starting a new one
    synth.cancel();
    const utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  };
  


  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Cool and Colorful Gallery</h2>
      <Row>
        {[{ image: image2, title: "Classroom", description: "Additional information or description for the classrooms can be found." },
          { image: image5, title: "Engaging Activities", description: "Engaging activities for the students in attendance." },
          { image: image6, title: "Family Importance", description: "Family importance and effects on the school environment." },
          { image: image3, title: "Our Teachers", description: "Our teachers interacting with our students." },
          { image: image4, title: "Creativity", description: "Creative outlets for our students in-house." }].map((item, index) => (
          <Col key={index} md={4} sm={6} xs={12} className="mb-4">
            <Card className="gallery-card" style={{ position: 'relative' }}>
              <Card.Img variant="top" src={item.image} alt={item.title} />
              <Button style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }} variant="outline-light" onClick={() => speakText(item.description)}>
                <FontAwesomeIcon icon={faVolumeUp} />
              </Button>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  {item.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;
