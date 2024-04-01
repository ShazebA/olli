import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBContainer, MDBInput, MDBCard } from 'mdb-react-ui-kit';
import './Clock.css';

function Clock() {
    const [clockData, setClockData] = useState({ name: '', comments: '' });
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await fetch('/api/clock');
            const data = await response.json();
            setRecords(data);
        } catch (error) {
            console.error('Failed to fetch clock-in records:', error);
        }
    };

    const handleInputChange = (e) => {
        setClockData({ ...clockData, [e.target.name]: e.target.value });
    };

    const handleClockIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/clock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...clockData,
                    date: new Date(),
                    clockInTime: new Date(),
                }),
            });
            if (response.ok) {
                alert('Clock-in recorded successfully');
                fetchRecords();
            } else {
                throw new Error('Failed to clock in');
            }
        } catch (error) {
            console.error('Failed to clock in:', error);
            alert('Failed to record clock-in');
        }
    };

    const handleClockOut = async (id) => {
        try {
            const response = await fetch(`/api/clock/${id}/clockout`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clockOutTime: new Date(),
                }),
            });
            if (response.ok) {
                alert('Clock-out recorded successfully');
                fetchRecords();
            } else {
                throw new Error('Failed to clock out');
            }
        } catch (error) {
            console.error('Failed to clock out:', error);
            alert('Failed to record clock-out');
        }
    };

    return (
        <MDBContainer>
            <MDBCard id='intro-card'>
                Are you clocking in for a shift? Please enter the following info below: Name, and what shift you are clocking in for.
            </MDBCard>
            <h2>Clock In</h2>
            <form onSubmit={handleClockIn}>
                <MDBInput label='Name' id='name' type='text' name="name" onChange={handleInputChange} required />
                <MDBInput label='Comments' id='comments' type='text' name="comments" onChange={handleInputChange} />
                <MDBBtn variant="primary" type="submit">Clock In</MDBBtn>
            </form>

            <h3>My Clock-In Records</h3>
            <ul>
                {records.map((record) => (
                    <li key={record._id}>
                        {record.name} - Clock In: {new Date(record.clockInTime).toLocaleString()}
                        {record.clockOutTime ? ` - Clock Out: ${new Date(record.clockOutTime).toLocaleString()}` : ''}
                        {!record.clockOutTime && (
                            <MDBBtn onClick={() => handleClockOut(record._id)} style={{ marginLeft: '10px' }}>
                                Clock Out
                            </MDBBtn>
                        )}
                    </li>
                ))}
            </ul>
        </MDBContainer>
    );
}

export default Clock;
