import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get('/alerts').then((res) => setAlerts(res.data));
  }, []);

  return (
    <div>
      <h3>Health Alerts</h3>
      <ul>
        {alerts.map((alert) => (
          <li key={alert._id}>{alert.message}</li>
        ))}
      </ul>
    </div>
  );
}