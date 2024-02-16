import React, { useState, useEffect } from 'react';
import '../App.css';

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const removeUser = async (userId) => {
    let decision = window.confirm('Are you sure you want to delete this user? It will remove all their data from the database:')
    if(decision){
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
          'Authorization': `${localStorage.getItem('token')}`
      
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const filteredUsers = users.filter(user => user._id !== userId);
        setUsers(filteredUsers);
      } catch (error) {
        setError(`Failed to remove user: ${error.message}`);
      }
    }

      return;
    
    
  };

  const saveChanges = async (userId) => {

    let decision = window.confirm("Are you sure you want to save these changes?")

    if(decision){
      const email = document.querySelector(`#email-${userId}`).value;
    const fullName = document.querySelector(`#fullName-${userId}`).value;
    const [fName, lName] = fullName.includes(' ') ? fullName.split(' ') : [fullName, '']; 
    const isAdmin = document.querySelector(`#isAdmin-${userId}`).value === 'Admin';
    console.log(localStorage.getItem('token'))

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
          
        },
        body: JSON.stringify({ email, fName, lName, isAdmin }),
      });
      if (!response.ok) {
        alert(`HTTP error! status: ${response.status}.Please try again.`);
        
      }
      if(response.ok){
        alert('User info successfully saved! Window will now refresh.')
        window.location.reload()
      }
      
      setEditingUserId(null); 
    } catch (error) {
      setError(`Failed to save changes: ${error.message}`);
    }
    }
    return ;
    
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="manage-users">
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              {editingUserId === user._id ? (
                <>
                  <td><input id={`email-${user._id}`} type="text" defaultValue={user.email} /></td>
                  <td><input id={`fullName-${user._id}`} type="text" defaultValue={`${user.fName} ${user.lName}`} /></td>
                  <td>
                    <select id={`isAdmin-${user._id}`} defaultValue={user.isAdmin ? 'Admin' : user.isParent ?  'Parent': user.isDependent?'Dependent':""}>
                      <option value="Parent">Parent</option>
                      <option value="Dependent">Dependent</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button className="save-user-btn" onClick={() => saveChanges(user._id)}>Save</button>
                    <button className="cancel-user-btn" onClick={() => setEditingUserId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.email}</td>
                  <td>{`${user.fName} ${user.lName}`}</td>
                  <td>{user.isAdmin ? 'Admin' : user.isParent ?  'Parent': user.isDependent?'Dependent':""}</td>
                  <td>
                  <button className="edit-user-btn" onClick={() => setEditingUserId(user._id)}>Edit</button>
                    <button className="remove-user-btn" onClick={() => removeUser(user._id)}>Remove</button>
                    
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUser;
