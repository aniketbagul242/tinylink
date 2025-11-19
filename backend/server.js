import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import linksRouter from './routes/links.js';
import { handleRedirect } from './controllers/redirectController.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// API routes
app.use('/api/links', linksRouter);

// Healthcheck endpoint
app.get('/healthz', (req, res) => {
  res.status(200).json({ ok: true, version: '1.0' });
});

// Redirect route
app.get('/:code', (req, res, next) => {
  if (req.params.code === 'api' || req.params.code === 'healthz') return next();
  handleRedirect(req, res);
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
