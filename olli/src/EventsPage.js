import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Calendar from 'react-calendar'; 
import './style.css';
import { get } from "mongoose";
//import 'react-calendar/dist/Calendar.css';



const EventsPage = () => { 
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '' });
    const [eventDates, setEventDates] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); // New state for admin status
    const [eventsList, setEventsList] = useState([]);
    const [isParent, setIsParent] = useState(false); // New state for parent status
    const [userID, setUserID] = useState('');
    const [hasRSVPed, setHasRSVPed] = ([]); // New state for RSVP status
    const [rsvpStatuses, setRsvpStatuses] = useState({});
    const [userData, setUserData] = useState([]);


    const token = sessionStorage.getItem('token');
    useEffect(() => {
    if (token) {
        fetch('/api/validateAdmin', { // You'll need to implement this endpoint
            method: 'POST',
            headers: {
                'authorization': token ,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => setIsAdmin(data.isAdmin))
        .catch(error => console.error('Error validating admin status:', error));
    }
}, [token]);

useEffect(() => {
    if (token) {
        fetch('/api/validateParent', { // You'll need to implement this endpoint
            method: 'POST',
            headers: {
                'authorization': token ,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => setIsParent(data.isParent))
        .catch(error => console.error('Error validating parent status:', error));
    }
}, [token]);

useEffect(() => {
    if (token) {
        fetch('/api/validateUserId', { // You'll need to implement this endpoint
            method: 'POST',
            headers: {
                'authorization': token ,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => setUserID(data.userID))
        .catch(error => console.error('Error validating user id:', error));
    }
}, [token]);


    const onChange = date => {
        setDate(date);
    };

    useEffect(() => {
        fetch('/api/loadEvents') // Replace with your API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch event dates');
                }
                return response.json();
            })
            .then(data => {
                data.forEach(event => {
                    eventsList.push(event);
                });
                setEvents(eventsList);
                const dates = data.map(event => new Date(event.date));
                setEventDates(dates);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        fetch('/api/loadEvents') // Replace with your API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch event dates');
                }
                return response.json();
            })
            .then(data => {
                const rsvpStatusesTemp = {};
                data.forEach(event => {
                    if (event.parents){
                        rsvpStatusesTemp[event._id] = event.parents.includes(userID);
                    }
                });
                setRsvpStatuses(rsvpStatusesTemp); ;
            })
            .catch(error => {
                console.error(error);
            });
    }, [userID]);

    // const validateRSVP = (eventId) => {
    //     if (hasRSVPed.includes(eventId)) {
    //         return true;
    //     }
    // } 

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            // Check if this date has any events
            const hasEvent = eventDates.some(eventDate =>
                date.getFullYear() === eventDate.getFullYear() &&
                date.getMonth() === eventDate.getMonth() &&
                date.getDate() === eventDate.getDate()
            );
            // If so, return a dot element
            return hasEvent ? <div className="event-dot"></div> : null;
        }
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

    useEffect(() => {
        fetch('/api/users') // Replace with your API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch event dates');
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleRSVP = (eventId) => {
        const payload = {
            eventId,
            parentId: userID, // This should be dynamically set based on the parent's user ID
        };

        fetch('/api/addParentEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token, // Assuming you're using the same token for authorization
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to RSVP to event');
            } else if (response.status === 400) {
                alert('Parent already RSVPed to this event');
                throw new Error('Parent already RSVPed to this event');
            }
            return response.json();
        })
        .then(data => {
            console.log('RSVP successful', data);
            setRsvpStatuses(prevStatuses => ({
            ...prevStatuses,
            [eventId]: true,
        }));
            // You may want to update your UI to reflect the RSVP status
        })
        .catch(error => {
            console.error('Error RSVPing to event:', error);
        });
    };

    const handleRemoveRSVP = async (eventId, parentId) => {

        fetch('/api/removeParentFromEvent', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ eventId, parentId }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to remove parent from RSVP list');
            }
            return response.json();
        })
        .then(() => {
            // Optionally refresh the list of events, or directly update state
            setEvents(prevEvents => prevEvents.map(event => {
                if (event._id === eventId) {
                    // Filter out the parentId from the parents array for the matching event
                    const updatedParents = event.parents.filter(id => id !== parentId);
                    return { ...event, parents: updatedParents };
                }
                return event;
            }));
            // Update the events state to reflect the removal
        })
        .catch(error => console.error('Error:', error));
    };
    


    const handleRmRSVP = (eventId) => {
        const payload = {
            eventId,
            parentId: userID, // This should be dynamically set based on the parent's user ID
        };

        fetch('/api/removeParentEvent', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token, // Assuming you're using the same token for authorization
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to cancel RSVP to event');
            }
            return response.json();
        })
        .then(data => {
            console.log('RSVP cancellation successful', data);
            rsvpStatuses[eventId] = false;
        })
        .catch(error => {
            console.error('Error cancelling RSVP to event:', error);
        });
    };

    const getUserNameById = (userId) => {
        const user = userData.find(user => user._id === userId);
        return user ? `${user.fName} ${user.lName}` : 'Unknown User';
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
                    <div>
                <h2>Events</h2>
                    {eventsForSelectedDate.length > 0 ? (
                        eventsForSelectedDate.map((event, index) => (
                            <div key={index} className="mb-4">
                                <h3>{event.title}</h3>
                                <p >{event.description}</p>
                                {isAdmin && (
                                    <div>
                                    <h4> Parents </h4>
                                    <ul>
                                    {event.parents.map(parentId => 
                                        <li key={parentId}>{getUserNameById(parentId)}
                                        <button onClick={() => handleRemoveRSVP(event._id, parentId)}>
                                                    Remove
                                         </button>
                                        </li>
                                    )}
                                </ul>
                                    </div>
)}
                                {isParent && (
                                    rsvpStatuses[event._id] ? ( 
                                        <div>
                                        <p>You have already RSVPed to this event!</p>
                                        <Button variant="success" onClick={() => handleRmRSVP(event._id)}>
                                            Remove RSVP
                                        </Button>
                                        </div>
                                    ) : (
                                    <Button variant="success" onClick={() => handleRSVP(event._id)}>
                                        RSVP
                                    </Button>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>No events for this date</p>
                    )}
                    </div>
                {isAdmin && (
                    <div>

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
                    </div>

                    )}
                </Col>
            </Row>
        </Container>
    );

};

export default EventsPage;