import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Login from './Login';
import EventsPage from './EventsPage';
import Register from './Register';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';




function HomePage() {
  return (
    <>
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
              <Nav.Link as={Link} to="/events">Events</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<EventsPage/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
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
          </Col>
        </Row>

        {/* Program Information Header */}
        <Row className="my-3">
          <Col>
            <h2>Program Information</h2>
          </Col>
        </Row>

        {/* Cheer Group Section */}
        <Row className="my-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Cheer Group</Card.Title>
                <Card.Text>
                CHEER Group consists
of families caring for an
adult with higher
functioning intellectual
disabilities. We pool
our resources to share
in hiring support
workers on a 4:1 ratio.
Sharing support worker wages means it costs far less
than the usual 1:1 ratio. Many of our families feel
that, while support is definitely required, the level of
1:1 is not necessary and the 1:4 is plenty of support
for their person. We have two energetic full time
support staff, a part-time staff, and some volunteer
grade 12 students. Currently the rate is $13.50 per
hour, as more attend the rate goes down. The Cheer
Group Program can be paid through Passport
funding!
The best part is that attendees are spending time
with their friends in their community! We follow a
preset calendar of events published in the month
prior. You sign up and pay for just what you use.
There are even times when you can request some
1:1 support if needed.
We have our club house located at Rock Glen Family
Resort and the use of their beautiful facilities,
including an indoor pool, sauna, fitness centre, hall,
and kitchen. Some of our projects are integrated
with the wider community and there are planned
special outings each month. We focus on building
life skills, social skills, and leisure skills. We aim to
build in as much community inclusion as possible
with a focus on the “normal”.
Attendees must be able to look after their own selfcare needs. Caregivers must be engaged, and
interested in their person’s success and the success
of the group as a whole. Family get togethers and
volunteering is a great part of this group.
We chose the name CHEER as the Webster
dictionary gives the definition as “shout for joy,
in praise or encouragement, give comfort and
support to.” Which fits exactly our purpose.

                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Cheer Works Section */}
        <Row className="my-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Cheer Works</Card.Title>
                <Card.Text>In June, 2023, we opened an
ice cream/variety store called
Cheer Canteen and Roxy’s
Putter Golf course at Rock
Glen Resort, in Arkona, open
street side to the public as
well as the camp, so please
come by and support us if
you are in the area. CHEER Works w employs
members of the CHEER Group who have been
developing their job skills. This is a safe and assisted
working environment providing paid employment for
our community members with intellectual disabilities.
Caregivers and community supporter volunteer to
help with this initiative. There are many different jobs
to be done. Everyone enjoys working together and we
have a great team! 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Cheer Connections Section */}
        <Row className="my-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Cheer Connections</Card.Title>
                <Card.Text>
                Cheer Connections, a
caregiver support group,
was formed in February,
2021, we had our first in
person meeting on
November 8, 2021, as
soon as the pandemic
restrictions allowed.
Cheer Connections is a group of parents and
caregivers, some have adult children in the
CHEER group and some don’t, but we are all in
a similar situation. We meet at least once a
month to offer each other support and share
our knowledge. Our winter meetings were
funded by the Ontario Caregivers Association,
which provided a relaxing day, a nice lunch,
and great guest speakers. The Cheer
Connections regularly gather for various
workshops so that we may discuss information
and learn together. We are all concerned
about ODSP, housing, employment, social
opportunities, etc. and a lot of our energy is
given to finding solutions for our loved ones’
future. This group helps reduce isolation for
caregivers as well. It is a requirement of the
CHEER Group that family members become
involved with Cheer Connections. We are a
close-knit social group that includes siblings,
friends, and neighbours who care about
someone with an intellectual disability. We are
committed to developing a community of
inclusion. We are supported by Ontario
Caregivers Association, Algarva 168
(Alhambra), and private community member
donors. We also run various fundraisers and
donations are accepted on line through
Canada Helps. Looking for some social fun?…
we have that too! Respite care is also available
so you don’t have to worry about your loved
one while you attend meetings.

                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Cheer Living Section */}
        <Row className="my-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Cheer Living</Card.Title>
                <Card.Text>
                  An upcoming program focused on independent living skills and living with minimal supports.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      {/* Contact Section */}
      <Row id="contact" className="my-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Contact Us</Card.Title>
              <Card.Text>
                <FontAwesomeIcon icon={faEnvelope} /> Email: <a href="mailto:ihartmancheer@gmail.com">ihartmancheer@gmail.com</a>
              </Card.Text>
              <Card.Text>
                <FontAwesomeIcon icon={faFacebook} /> Facebook: <a href="https://www.facebook.com/familyconnectionscheer" target="_blank" rel="noopener noreferrer">Family Connections Cheer</a> 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default HomePage;
