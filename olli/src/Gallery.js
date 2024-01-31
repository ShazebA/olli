import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Gallery = () => {
  const galleryImages = [
    {
      url: 'https://via.placeholder.com/150',
      caption: 'Beautiful Sunset',
    },
    {
      url: 'https://via.placeholder.com/150',
      caption: 'Colorful Mountains',
    },
    {
      url: 'https://via.placeholder.com/150',
      caption: 'City Lights at Night',
    },
    // Add more image URLs and captions as needed
  ];

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Cool and Colorful Gallery</h2>
      <Row>
        {galleryImages.map((image, index) => (
          <Col key={index} md={4} sm={6} xs={12} className="mb-4">
            <Card className="gallery-card">
              <Card.Img variant="top" src={image.url} alt={image.caption} />
              <Card.Body>
                <Card.Title>{image.caption}</Card.Title>
                <Card.Text>
                  Additional information or description about the image can go here.
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
