import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Form, Button, ListGroup } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs'; // Ensure you have `react-icons` installed
import "./Chat.css";


const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('dependents');
  const [activeKey, setActiveKey] = useState('dependents');
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin status

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (token) {
        fetch('/api/validateAdmin', { 
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

const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'authorization': token, // Replace yourAuthToken appropriately
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
      setMessages(messages.filter(message => message._id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  useEffect(() => {
    fetch(`/api/messages/${selectedGroup}`, {
        headers: {
        'authorization': token,
      },
    })
    .then(response => response.json())
    .then(data => setMessages(data))
    .catch(error => console.error('Error fetching messages:', error));
  }, [token, selectedGroup]);

  const sendMessage = (e) => {
    e.preventDefault();
    const newMessage = {
      text: message,
      group: selectedGroup,
    };

    // Send message to server
    fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify(newMessage),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      return response.json();
    })
    .then(data => {
      setMessages([...messages, data]);
      setMessage('');
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
  };

  return (
    <div className="chat-container">
      <Tabs
        id="group-tabs"
        activeKey={activeKey}
        onSelect={(k) => {
          setActiveKey(k);
          setSelectedGroup(k);
        }}
        className="mb-3"
      >
        <Tab eventKey="dependents" title="Dependents">
          {/* Content dynamically populated based on group */}
        </Tab>
        <Tab eventKey="parents" title="Parents">
          {/* Content dynamically populated based on group */}
        </Tab>
        <Tab eventKey="announcements" title="Announcements">
          {/* Content dynamically populated based on group */}
        </Tab>
      </Tabs>
      <ListGroup className="message-list">
        {messages.map((msg, index) => (
          <ListGroup.Item key={index} className="message-item">
            <div><strong>{msg.senderName}</strong> <small>{new Date(msg.createdAt).toLocaleString()}</small></div>
            <div>{msg.text}</div>
            {isAdmin && <BsTrash className="delete-icon" onClick={() => deleteMessage(msg._id)} />}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {selectedGroup !== 'announcements' && (
        <Form onSubmit={sendMessage} className="message-form">
          <Form.Group className="mb-3" controlId="messageInput">
            <Form.Control
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Chat;
