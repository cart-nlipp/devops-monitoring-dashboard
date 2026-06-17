import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function App() {
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get("https://devops-monitoring-dashboard-x85t.onrender.com/metrics-data");
        setMetrics(res.data);
        setHistory(prev => [...prev.slice(-10), {
          time: new Date().toLocaleTimeString(),
          freeMemory: parseFloat(res.data.freeMemory)
        }]);
      } catch (err) {
        console.error("Error fetching metrics:", err);
      }
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", background: "#1a1a2e", minHeight: "100vh", color: "white" }}>
      <h1 style={{ color: "#00d4ff" }}>🖥️ DevOps Monitoring Dashboard</h1>
      {metrics ? (
        <div>
          <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
            <div style={{ background: "#4CAF50", padding: "20px", borderRadius: "10px", minWidth: "150px" }}>
              <h3>✅ Status</h3>
              <p>Running</p>
            </div>
            <div style={{ background: "#2196F3", padding: "20px", borderRadius: "10px", minWidth: "150px" }}>
              <h3>💾 Free Memory</h3>
              <p>{metrics.freeMemory}</p>
            </div>
            <div style={{ background: "#FF9800", padding: "20px", borderRadius: "10px", minWidth: "150px" }}>
              <h3>⏱️ Uptime</h3>
              <p>{metrics.uptime}</p>
            </div>
            <div style={{ background: "#9C27B0", padding: "20px", borderRadius: "10px", minWidth: "150px" }}>
              <h3>🖥️ Platform</h3>
              <p>{metrics.platform}</p>
            </div>
            <div style={{ background: "#f44336", padding: "20px", borderRadius: "10px", minWidth: "150px" }}>
              <h3>💻 Total Memory</h3>
              <p>{metrics.totalMemory}</p>
            </div>
          </div>
          <h2 style={{ color: "#00d4ff" }}>📈 Memory Usage Over Time</h2>
          <LineChart width={600} height={300} data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip />
            <Line type="monotone" dataKey="freeMemory" stroke="#00d4ff" strokeWidth={2} />
          </LineChart>
        </div>
      ) : (
        <p style={{ color: "#00d4ff" }}>⏳ Loading metrics...</p>
      )}
    </div>
  );
}

export default App;