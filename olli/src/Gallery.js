import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import image2 from "./istockphoto-1358014313-1024x1024.jpg"
import image3 from "./istockphoto-486325400-612x612.jpg"
import image4 from "./istockphoto-1168454133-1024x1024.jpg"
import image5 from "./istockphoto-539281953-612x612.jpg"
import image6 from "./istockphoto-1324653833-612x612.jpg"


const Gallery = () => {

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Cool and Colorful Gallery</h2>
      <Row>
          <Col key={"Classrooms"} md={4} sm={6} xs={12} className="mb-4">
            <Card className="gallery-card">
              <Card.Img variant="top" src={image2} alt={"Classroom"} />
              <Card.Body>
                <Card.Title>{"Classroom"}</Card.Title>
                <Card.Text>
                  Additional information or description for the classrooms can be found.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col key={"Engaging Activities"} md={4} sm={6} xs={12} className="mb-4">
            <Card className="gallery-card">
              <Card.Img variant="top" src={image5} alt={"Engaging Activities"} /> 
              <Card.Body>
                <Card.Title>{"Engaging Activities"}</Card.Title> 
                <Card.Text> 
                   Engaging activities for the students in attendance.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col key={"Family Importance"} md={4} sm={6} xs={12} className="mb-4"> 
            <Card className="gallery-card">
              <Card.Img variant="top" src={image6} alt={"Family Importance"} /> 
              <Card.Body>
                <Card.Title>{"Family Importance"}</Card.Title> 
                <Card.Text> 
                   Family importance and effects on the school environment.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col key={"Our Teachers"} md={4} sm={6} xs={12} className="mb-4"> 
            <Card className="gallery-card">
              <Card.Img variant="top" src={image3} alt={"Our Teachers"} /> 
              <Card.Body>
                <Card.Title>{"Our Teachers"}</Card.Title> 
                <Card.Text> 
                   Our teachers interacting with our students.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col key={"Creativity"} md={4} sm={6} xs={12} className="mb-4"> 
            <Card className="gallery-card">
              <Card.Img variant="top" src={image4} alt={"Creativity"} /> 
              <Card.Body>
                <Card.Title>{"Creativity"}</Card.Title> 
                <Card.Text> 
                   Creative outlets for our students in-house.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
      </Row>
    </Container>
  );
};

export default Gallery;
