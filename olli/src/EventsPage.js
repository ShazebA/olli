import React, { useState} from "react";
import {Container, Row, Col} from 'react-bootstrap';
import Calender from 'react-calendar';

const EventsPage = () => { 
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    const onChange = date => {
        setDate(date);
    };

    const eventsForSelectedDate = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === date.toDateString();
    });

    return (
        <Container className="mt-5">
            <Row>
                <Col md={6}>
                    <h2> Event Calender</h2>
                    <Calender onChange={onChange} value={date} />
                </Col>
                <Col md={6}>
                    <h2>Events</h2>
                    {eventsForSelectedDate.length > 0 ? (
                        eventsForSelectedDate.map((event, index) => (
                                <div key={event.id} className="mb-4">
                                    <h3>{event.title}</h3>
                                    <p>{event.description}</p>
                                </div>
                        ))
                    ) : (
                        <p>No events for this date</p>
                    )}
                </Col>
            </Row>
        </Container>
    );

};

export default EventsPage;