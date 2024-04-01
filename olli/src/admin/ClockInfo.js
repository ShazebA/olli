import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Button } from 'react-bootstrap';
import { MDBCard } from 'mdb-react-ui-kit';

function ClockInfo() {
    const [clockRecords, setClockRecords] = useState([]);
    const [key, setKey] = useState('waiting');

    useEffect(() => {
        fetchClockRecords();
    }, []);

    const fetchClockRecords = async () => {
        try {
            const response = await fetch('/api/clock');
            if (!response.ok) throw new Error('Failed to fetch clock records');
            const data = await response.json();
            setClockRecords(data);
        } catch (error) {
            console.error('Failed to fetch clock records:', error);
        }
    };

    const updateRecordStatus = async (id, decision) => {

        let d = window.confirm(`Are you sure you want to ${decision} this punch?`)
        if(!d){
            return;
        }
        try {
            const response = await fetch(`/api/clock/${id}/decision`, { 
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ decision }),
            });
            if (!response.ok) throw new Error('Failed to update record status');
            alert(`Record ${decision.toLowerCase()} successfully`); 
            fetchClockRecords(); 
        } catch (error) {
            console.error('Failed to update record status:', error);
            alert('Failed to update record status'); 
        }
    };

    const calculateTotalHours = (clockInTime, clockOutTime, breaks) => {
        if (!clockOutTime) return 'Pending Clock-Out'; 

        let totalMillis = new Date(clockOutTime) - new Date(clockInTime);
        if (breaks && breaks.length > 0) {
            const totalBreakMillis = breaks.reduce((acc, curr) => {
                return acc + (new Date(curr.endTime) - new Date(curr.startTime));
            }, 0);
            totalMillis -= totalBreakMillis;
        }

        
        return (totalMillis / (1000 * 60 * 60)).toFixed(2);
    };

    const renderRecords = (status) => {
        const filteredRecords = clockRecords.filter((record) => record.decision === status);
        
        if (filteredRecords.length === 0) {
            return (
                <MDBCard className="mb-3">
                    <div className="p-3">
                        <p>No punches {status.toLowerCase()}.</p>
                    </div>
                </MDBCard>
            );
        }
        
        return clockRecords
        .filter((record) => record.decision === status)
        .map((record) => (
            <MDBCard className="mb-3" key={record._id}>
                <div className="record p-3">
                    <p>Name: {record.name}</p>
                    <p>Date: {new Date(record.date).toLocaleDateString()}</p>
                    <p>Clock In: {new Date(record.clockInTime).toLocaleTimeString()}</p>
                    {record.clockOutTime && <p>Clock Out: {new Date(record.clockOutTime).toLocaleTimeString()}</p>}
                    <p>Comments: {record.comments}</p>
                    <p>Total Hours Worked: {calculateTotalHours(record.clockInTime, record.clockOutTime, record.breaks)}</p>
                    {status === 'Waiting' && (
                        <>
                            <Button variant="success" className="me-2" onClick={() => updateRecordStatus(record._id, 'Approved')}>Approve</Button>
                            <Button variant="danger" onClick={() => updateRecordStatus(record._id, 'Denied')}>Deny</Button>
                        </>
                    )}
                </div>
            </MDBCard>
        ));
    };

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="waiting" title="Waiting">
                {renderRecords('Waiting')}
            </Tab>
            <Tab eventKey="approved" title="Approved">
                {renderRecords('Approved')}
            </Tab>
            <Tab eventKey="denied" title="Denied">
                {renderRecords('Denied')}
            </Tab>
        </Tabs>
    );
}

export default ClockInfo;
