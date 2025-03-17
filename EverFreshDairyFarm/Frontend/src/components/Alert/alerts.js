import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const res = await axios.get("http://localhost:5000/alerts");
      setAlerts(res.data);
      res.data.forEach(alert => toast.warning(alert.message)); // Show real-time notifications
    };

    fetchAlerts();
  }, []);

  return (
    <div>
      <h3>⚠️ Health Alerts</h3>
      <ul>
        {alerts.map(alert => (
          <li key={alert._id}>
            {alert.message} <button onClick={() => resolveAlert(alert._id)}>✔</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const resolveAlert = async (id) => {
  await axios.put(`http://localhost:5000/alerts/${id}`);
  window.location.reload();
};

export default Alerts;
