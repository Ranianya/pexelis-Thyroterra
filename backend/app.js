import express from 'express';
import habitRoutes from './routes/habitRoutes.js';

const app = express();
app.use(express.json());

// Main User Flows [cite: 85]
app.use('/api/rituals', habitRoutes);

export default app;