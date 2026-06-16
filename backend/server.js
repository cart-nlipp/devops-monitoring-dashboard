const express = require('express');
const cors = require('cors');
const os = require('os');
const client = require('prom-client');

const app = express();
app.use(cors());
app.use(express.json());

// Prometheus metrics
client.collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route']
});

// Health check
app.get('/health', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', route: '/health' });
  res.json({ status: 'OK' });
});

// System metrics
app.get('/metrics-data', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', route: '/metrics-data' });
  res.json({
    cpu: os.loadavg(),
    totalMemory: (os.totalmem() / 1024 / 1024).toFixed(2) + ' MB',
    freeMemory: (os.freemem() / 1024 / 1024).toFixed(2) + ' MB',
    uptime: (os.uptime() / 60).toFixed(2) + ' minutes',
    platform: os.platform(),
    hostname: os.hostname()
  });
});

// Prometheus endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});