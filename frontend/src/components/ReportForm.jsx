import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

function ReportForm() {
  const [formData, setFormData] = useState({ description: '', latitude: '', longitude: '', urgency: 'low' });
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post('http://localhost:5000/report/submit', formData, {
        headers: { 'x-auth-token': token },
      });
      if (res.status === 201) {
        setFormData({ description: '', latitude: '', longitude: '', urgency: 'low' });
        alert('Report submitted!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit report');
      console.error('Error:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded">
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Latitude</Form.Label>
        <Form.Control
          type="number"
          step="0.000001"
          value={formData.latitude}
          onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="number"
          step="0.000001"
          value={formData.longitude}
          onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Urgency</Form.Label>
        <Form.Select
          value={formData.urgency}
          onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">Submit Report</Button>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Form>
  );
}

export default ReportForm;