// Finals Lab Activity 4 — Eisen Josh Salonga Bangit
require('dotenv').config({ path: require('node:path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const connectDB = require('./database/db');
const app = require('./app');

async function start() {
  try {
    await connectDB();
    const port = process.env.PORT || 4000;
    const server = app.listen(port, () => console.log(`Student API running at http://localhost:${port}`));
    server.on('error', error => { console.error(`Unable to start server: ${error.code}`); process.exit(1); });
    const shutdown = () => server.close(async () => { await mongoose.disconnect(); process.exit(0); });
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('Could not connect to MongoDB. Check backend/.env, your database service or Atlas user/network settings.');
    console.error(`Error type: ${error.name}`);
    process.exit(1);
  }
}
start();
