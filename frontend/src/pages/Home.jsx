import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaExclamationTriangle, FaUsers, FaDesktop, FaPercentage } from 'react-icons/fa';

function Home() {
  return (
    <div className="hero-section">
      <Container className="text-center">
        <h1 className="hero-title">Shore Watch Connect</h1>
        <p className="hero-subtitle">Real-time ocean hazard monitoring and citizen reporting platform for India's coastal communities. Protecting lives through technology and community collaboration.</p>
        <Button variant="primary-custom" className="me-2"><FaExclamationTriangle /> Report Ocean Hazard</Button>
        <Button variant="primary-custom"><FaMapMarkerAlt /> View Live Map</Button>
        <Row className="mt-4">
          <Col md={3}>
            <Card className="stats-card">
              <Card.Body>
                <FaExclamationTriangle className="text-warning" size={30} />
                <h2>12</h2>
                <p>Active Alerts</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stats-card">
              <Card.Body>
                <FaUsers className="text-success" size= {30} />
                <h2>247</h2>
                <p>Community Reports</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stats-card">
              <Card.Body>
                <FaMonitor className="text-secondary" size= {30} />
                <h2>89</h2>
                <p>Monitoring Stations</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stats-card">
              <Card.Body>
                <FaPercentage className="text-info" size= {30} />
                <h2>98.7%</h2>
                <p>Accuracy Rate</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
  }

  export default Home;