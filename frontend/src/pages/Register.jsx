import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'citizen' });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post('http://localhost:5000/auth/register', formData);
      alert('Registration successful! Please login.');
      window.location.href = '/login';
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      console.error('Error:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded" style={{ maxWidth: '300px', margin: '2rem auto' }}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="citizen">Citizen</option>
          <option value="admin">Admin</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">Register</Button>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Form>
  );
}

export default Register;