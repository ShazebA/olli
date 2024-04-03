import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import AccessibilityFooter from './AccessibilityFooter';

import image2 from "./istockphoto-1358014313-1024x1024.jpg";
import image3 from "./istockphoto-486325400-612x612.jpg";
import image4 from "./istockphoto-1168454133-1024x1024.jpg";
import image5 from "./istockphoto-539281953-612x612.jpg";
import image6 from "./istockphoto-1324653833-612x612.jpg";
// import defaultImage from "./default-image.jpg"; // You can use a default image for placeholders

const Gallery = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files);
    setImages(prevImages => [...prevImages, ...uploadedImages]);
  };

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">CHEER Gallery</h2>
      <div id="main-content" className="main-content">
        <Row>
          {/* Render existing images */}
          {[{ image: image2, title: "Classroom. Additional information or description for the classrooms can be found." },
          { image: image5, title: "Engaging Activities. Engaging activities for the students in attendance." },
          { image: image6, title: "Family Importance. Family importance and effects on the school environment." },
          { image: image3, title: "Our Teachers. Our teachers interacting with our students." },
          { image: image4, title: "Creativity. Creative outlets for our students in-house." },
            // Add other existing images here
          ].map((item, index) => (
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

          {/* Render uploaded images */}
          {images.map((image, index) => (
            <Col key={index} md={4} sm={6} xs={12} className="mb-4">
              <Card className="gallery-card" style={{ position: 'relative' }}>
                <Card.Img variant="top" src={URL.createObjectURL(image)} alt={`Uploaded Image ${index + 1}`} />
                <Card.Body>
                  <Card.Title>Uploaded Image {index + 1}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Image upload section */}
        <Container className="mt-4">
          <Col>
            <h4>Upload Images</h4> {/* Title for the upload section */}
            <input type="file" accept="image/*" onChange={handleImageUpload} multiple />
          </Col>
        </Container>
      </div>
      <AccessibilityFooter />
    </Container>
  );
};

export default Gallery;
