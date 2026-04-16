import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errorHandler } from './middleware/errorHandler';
import apiRoutes from './routes'; 

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Wallet API is running!' });
});

// Mount all API routes under /api
app.use('/api', apiRoutes);

// ⚠️ Error handler MUST be the last middleware
app.use(errorHandler);

export default app;