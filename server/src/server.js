import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  const server = http.createServer(app);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    server.close(() => process.exit(0));
  });

  server.listen(PORT, () => {
    logger.info(`API listening on http://localhost:${PORT}`);
  });
})();
