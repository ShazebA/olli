import React, { useState, useEffect } from 'react';
import './Waivers.css';

const Waivers = () => {
  const [waivers, setWaivers] = useState([]);
  const [selectedWaiver, setSelectedWaiver] = useState(null);
  const [parentName, setParentName] = useState('');
  const [dependents, setDependents] = useState([]);
  const [selectedDependents, setSelectedDependents] = useState([]);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [waiverResponse, dependentResponse] = await Promise.all([
          fetch('/api/waivers',
          { method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': token
            }
          }),
          fetch('/api/dependents', 
          { method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': token
            }
          }),
        ]);

        if (!waiverResponse.ok || !dependentResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const waivers = await waiverResponse.json();
        const dependents = await dependentResponse.json();

        setWaivers(waivers);
        setDependents(dependents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleWaiverSelect = (waiver) => {
    setSelectedWaiver(waiver);
  };

  const handleParentNameChange = (event) => {
    setParentName(event.target.value);
  };

  const handleDependentSelect = (dependent) => {
    if (selectedDependents.includes(dependent)) {
      setSelectedDependents(selectedDependents.filter((d) => d !== dependent));
    } else {
      setSelectedDependents([...selectedDependents, dependent]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/waivers/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token},
        body: JSON.stringify({
          waiverID: selectedWaiver._id,
          parentName,
          dependents: selectedDependents,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign waiver');
      }

      console.log('Waiver signed successfully');
    } catch (error) {
      console.error('Error signing waiver:', error);
    }
  };

  return (
    <div>
      <h2>Waivers</h2>
      <ul>
        {waivers.map((waiver) => (
          <li key={waiver._id} onClick={() => handleWaiverSelect(waiver)}>
            {waiver.name}
          </li>
        ))}
      </ul>
      {selectedWaiver && (
        <div>
          <h3>{selectedWaiver.name}</h3>
          <p>{selectedWaiver.description}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your full name"
              value={parentName}
              onChange={handleParentNameChange}
            />
            <h4>Select Dependents:</h4>
            {dependents.map((dependent) => (
              <div key={dependent._id}>
                <input
                  type="checkbox"
                  id={dependent._id}
                  checked={selectedDependents.includes(dependent)}
                  onChange={() => handleDependentSelect(dependent)}
                />
                <label htmlFor={dependent._id}>{dependent.name}</label>
              </div>
            ))}
            <button type="submit">Sign Waiver</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Waivers;