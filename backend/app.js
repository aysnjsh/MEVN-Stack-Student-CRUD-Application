const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('node:path');
const fs = require('node:fs');
const studentRoute = require('./routes/student.route');
const errorHandler = require('./middleware/errorHandler');
const app = express();

app.disable('x-powered-by');
app.use(cors({ origin: (process.env.CLIENT_URL || 'http://localhost:8080').split(',').map(value => value.trim()) }));
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));
app.get('/api/health', (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({ status: connected ? 'ok' : 'unavailable', database: connected ? 'connected' : 'disconnected' });
});
app.use('/api', studentRoute);
app.use('/api', (req, res) => res.status(404).json({ message: 'API endpoint not found.' }));

// After npm run build, this server also hosts Vue with history-mode routing.
const frontendDist = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(path.join(frontendDist, 'index.html'))) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res) => res.sendFile(path.join(frontendDist, 'index.html')));
} else {
  app.get('/', (req, res) => res.json({ message: 'Student API is running. Open http://localhost:8080 for the Vue app.' }));
}
app.use(errorHandler);
module.exports = app;
