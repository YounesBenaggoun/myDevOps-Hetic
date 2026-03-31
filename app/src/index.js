const express = require('express');
const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'DevOps Training Application',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/version', (req, res) => {
  res.json({
    version: '1.0.0',
    name: 'devops-app'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Redis URL: ${process.env.REDIS_URL || 'redis://redis:6379'}`);
  console.log(`DB Host: ${process.env.DB_HOST || 'postgres'}`);
});