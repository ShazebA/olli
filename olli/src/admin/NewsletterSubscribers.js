import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBContainer, MDBInput, MDBCard } from 'mdb-react-ui-kit';

const NewsletterSubscribers = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        
        const fetchSubscribers = async () => {
            try {
                const response = await fetch('/api/newsletter/subscribers');
                const data = await response.json();
                setSubscribers(data);
            } catch (err) {
                console.error('Failed to fetch subscribers:', err);
            }
        };

        fetchSubscribers();
    }, []);

    
    const copyEmailsToClipboard = () => {
        const emails = subscribers.map(subscriber => subscriber.email).join('; ');
        navigator.clipboard.writeText(emails)
            .then(() => setCopySuccess('Emails copied to clipboard!'))
            .catch(err => console.error('Error copying emails to clipboard:', err));
    };

    return (
        <MDBContainer className="newsletter-subscribers-container">
            <MDBCard className="my-3 p-3">
                <h2>Newsletter Subscribers</h2>
                <p>Here you can see all the people who have subscribed to the newsletter. Click the button below to copy their emails.</p>
            </MDBCard>

            {subscribers.length > 0 ? (
                <ul className="subscriber-list">
                    {subscribers.map((subscriber, index) => (
                        <li key={index} className="subscriber-item">
                            {subscriber.fName} {subscriber.lName} - {subscriber.email}
                        </li>
                    ))}
                </ul>
            ) : (
                <MDBCard className="my-3 p-3">
                    <p>No subscribers found.</p>
                </MDBCard>
            )}
            <MDBBtn color="primary" onClick={copyEmailsToClipboard}>
                Copy All Emails
            </MDBBtn>
            {copySuccess && <div className="alert alert-success mt-3">{copySuccess}</div>}
        </MDBContainer>
    );
};

export default NewsletterSubscribers;
