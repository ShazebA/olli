import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css';



const EventsPage = () => { 
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '' });
    const [eventDates, setEventDates] = useState([]);



    const onChange = date => {
        setDate(date);
    };

    useEffect(() => {
        fetch('/api/events') // Replace with your API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch event dates');
                }
                return response.json();
            })
            .then(data => {
                const dates = data.map(event => new Date(event.date));
                setEventDates(dates);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateToCheck = new Date(date);
            dateToCheck.setHours(0, 0, 0, 0);

            if (eventDates.some(eventDate => eventDate.getTime() === dateToCheck.getTime())) {
                return <div className="event-dot"></div>;
            }
        }

        return null;
    };

    const eventsForSelectedDate = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === date.toDateString();
    });

    const handleEventSubmit = (e) => {
        e.preventDefault();
        
        // Create a new event object from form input
        const newEventData = {
            title: newEvent.title,
            description: newEvent.description,
            date: newEvent.date,
        };
    
        // Make a POST request to store the event data
        fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEventData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add event');
            }
            return response.json();
        })
        .then(data => {
            // Update the events state with the new event
            const updatedEvents = [...events, data];
            setEvents(updatedEvents);
            
            // Clear the form fields
            setNewEvent({ title: '', description: '', date: '' });
        })
        .catch(error => {
            console.error('Error adding event:', error);
        });
    };
    


    return (
        <Container className="mt-5">
            <Row>
                <Col md={6}>
                    <h2>Event Calendar</h2>
                    <Calendar
                        onChange={onChange}
                        value={date}
                        tileContent={tileContent}
                    />
                </Col>
                <Col md={6}>
                    <h2>Events</h2>
                    {eventsForSelectedDate.length > 0 ? (
                        eventsForSelectedDate.map((event, index) => (
                            <div key={index} className="mb-4">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No events for this date</p>
                    )}
                    <h2>Add Event</h2>
                    <Form onSubmit={handleEventSubmit}>
                        <Form.Group controlId="eventTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Event Title"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="eventDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Event Description"
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="eventDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Event
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};

export default EventsPage;