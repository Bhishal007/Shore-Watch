import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

function Map({ reports }) {
  const [position, setPosition] = useState([19.076090, 72.877655]); // Default to Mumbai

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  return (
    <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {reports.map((report, index) => (
        <Marker key={index} position={[report.latitude, report.longitude]}>
          <Popup>{report.description} (Urgency: {report.urgency})</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;