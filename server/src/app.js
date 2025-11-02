// import express from 'express';
// import helmet from 'helmet';
// import cors from 'cors';
// import morgan from 'morgan';
// import rateLimit from 'express-rate-limit';
// import authRoutes from './routes/authRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import webhookRoutes from './routes/webhookRoutes.js';
// import errorHandler from './middleware/errorHandler.js';

// const app = express();

// // security
// app.use(helmet());
// app.use(cors({
//   origin: process.env.FRONTEND_URL?.split(',') || ['http://localhost:5173'],
//   credentials: true
// }));

// // raw body for webhooks must be before json middleware for that route
// app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// app.use(express.json());
// app.use(morgan('dev'));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 200
// });
// app.use(limiter);

// // routes
// app.use('/api/auth', authRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/webhooks', webhookRoutes);

// app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// // error handling
// app.use(errorHandler);

// export default app;
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL?.split(',') || ['http://localhost:5173'],
  credentials: true
}));

// Webhooks need raw body before JSON parsing
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

app.use(express.json());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
});
app.use(limiter);

// ------------------ API Routes ------------------
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/webhooks', webhookRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ------------------ Serve React Frontend ------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// For any route not starting with /api, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
// -----------------------------------------------------------

// Global error handler
app.use(errorHandler);

export default app;
