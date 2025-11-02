import mongoose from 'mongoose';
import logger from '../utils/logger.js';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/finease';
  try {
    await mongoose.connect(uri, { dbName: 'finease' });
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error({ err }, 'MongoDB connection error');
    process.exit(1);
  }
};
