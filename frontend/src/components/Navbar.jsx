import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaExclamationTriangle, FaTachometerAlt, FaUsers, FaCog } from 'react-icons/fa';

function Navbar() {
  return (
    <BootstrapNavbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <BootstrapNavbar.Brand as={Link} to="/">
        <FaExclamationTriangle className="me-2" /> Shore Watch Connect
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/"><FaMapMarkerAlt /> Live Map</Nav.Link>
          <Nav.Link as={Link} to="/report-hazard"><FaExclamationTriangle /> Report Hazard</Nav.Link>
          <Nav.Link as={Link} to="/dashboard"><FaTachometerAlt /> Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/community"><FaUsers /> Community</Nav.Link>
          <Nav.Link as={Link} to="/settings"><FaCog /> Settings</Nav.Link>
          <Button variant="info" className="ms-2">System Active</Button>
          <Button variant="danger" className="ms-2">Emergency Alert</Button>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

export default Navbar;