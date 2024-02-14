import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import LogoTitle from './LogoTitle';

function HomePage() {
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
