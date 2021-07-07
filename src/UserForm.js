import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getUser, saveUser } from './api';

const UserForm = ({ visibility, onClose, onRefresh, userId }) => {
  
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [score, setScore] = useState('');
  const [loading, setLoading] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validScore, setValidScore] = useState(false);

  useEffect(() => {
    setValidEmail(!!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)/g));
    setValidScore(score !== '' && parseInt(score) >= 0 && parseInt(score) <= 100);
  }, [email, score]);

  const onSubmit = async () => {
    const postData = {
      user_id: userId,
      user_name: userName,
      email,
      score
    }
    if(!userId) postData.registered = new Date();
    setLoading(true);
    const { status } = await saveUser(postData);
    if([200, 201].indexOf(status) >= 0){
      onClose();
      onRefresh();
      setLoading(false);
    }
  }

  useEffect(() => {
    if(visibility){
      setUserName('');
      setEmail('');
      setScore('');
      !!userId && getUser(userId).then(({ data }) => {
        setUserName(data.user_name);
        setEmail(data.email);
        setScore(data.score);
      });
    }
  }, [visibility, userId]);

  return <Modal show={visibility} onHide={onClose}>
    <Form>
      <Modal.Header closeButton>
        <Modal.Title>{userId ? 'Update User' : 'Add User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label htmlFor="user_name">User Name</Form.Label>
          <Form.Control 
            type="text" 
            value={userName} 
            onChange={(event) => setUserName(event.target.value)} 
            id="user_name" 
            placeholder="Type user name" />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control 
            type="email" 
            value={email} 
            onChange={(event) => setEmail(event.target.value)} 
            id="email" 
            placeholder="Type a valid email address" />
          {!!email && !validEmail && <small className="text-danger">Not a valid email address</small>}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="score">Score</Form.Label>
          <Form.Control 
            type="number" 
            value={score} 
            onChange={(event) => setScore(event.target.value)} 
            id="score" 
            placeholder="User score" />
          {score !== '' && !validScore && <small className="text-danger">Score must between 0 - 100</small>}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" disabled={!userName || !validEmail || !validScore || loading} onClick={onSubmit}>
          {loading ? 'Saving..' : 'Save User'}
        </Button>
      </Modal.Footer>
    </Form>
  </Modal>
}

export default UserForm;