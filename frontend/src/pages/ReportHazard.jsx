import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaExclamationTriangle, FaPhone, FaUser, FaCamera } from 'react-icons/fa';

function ReportHazard() {
  return (
    <Container className="my-4">
      <h1>Report Ocean Hazard</h1>
      <p>Help protect your community by reporting ocean hazards in real-time. Your reports contribute to our early warning system.</p>
      <Row>
        <Col md= {8} >
          <Card className="form-custom">
            <Card.Header>Hazard Report Form</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Type of Ocean Hazard *</Form.Label>
                  <Form.Select>
                    <option>Select hazard type</option>
                    <option>Tsunami</option>
                    <option>Storm Surge</option>
                    <option>High Waves</option>
                    <option>Swell Surge</option>
                    <option>Coastal Erosion</option>
                    <option>Coastal Flooding</option>
                    <option>Other Ocean Hazard</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location *</Form.Label>
                  <Form.Control placeholder="Enter specific location or coordinates" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Severity Level *</Form.Label>
                  <Form.Select>
                    <option>Select severity level</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Detailed Description *</Form.Label>
                  <Form.Control as="textarea" placeholder="Describe what you observed, including time, weather conditions, and any damage or impacts..." />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name *</Form.Label>
                  <Form.Control placeholder="Full name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Number *</Form.Label>
                  <Form.Control placeholder="Phone number" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Photo/Video Evidence (Optional)</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <Button variant="primary-custom" type="submit"><FaExclamationTriangle /> Submit Hazard Report</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md= {4} >
          <Card>
            <Card.Header>Emergency Contacts</Card.Header>
            <Card.Body>
              <Alert variant="danger" className="mb-3">National Emergency: 112</Alert>
              <Alert variant="info" className="mb-3">INCOIS Emergency: 1800-XXX-XXXX</Alert>
              <Alert variant="secondary">Coast Guard: 1554</Alert>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Header>Reporting Guidelines</Card.Header>
            <Card.Body>
              <ul>
                <li>Report immediately for any urgent situations</li>
                <li>Include precise location details</li>
                <li>Attach photos/videos when safe to do so</li>
                <li>Your identity will be protected</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
  }

  export default ReportHazard;