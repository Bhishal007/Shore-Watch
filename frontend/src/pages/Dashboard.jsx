import { useEffect, useState } from 'react';
import axios from 'axios';
import Map from '../components/Map';
import { Table, Button } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

function Dashboard() {
  const [reports, setReports] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('http://localhost:5000/report/all', {
          headers: { 'x-auth-token': token },
        });
        setReports(res.data);
      } catch (err) {
        console.error('Error fetching reports:', err);
      }
    };
    fetchReports();
  }, [token]);

  return (
    <div className="container">
      <h1 className="mb-4">Dashboard</h1>
      <Map reports={reports} />
      <h2 className="mt-4">Reports</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Urgency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{report.description}</td>
              <td>{report.latitude}</td>
              <td>{report.longitude}</td>
              <td>{report.urgency}</td>
              <td>
                {user?.role === 'admin' && <Button variant="success">Approve</Button>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
  }

  export default Dashboard;