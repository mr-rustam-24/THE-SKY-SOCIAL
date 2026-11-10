import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import './db.js';

import authRoutes from './routes/authRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import { MENU_ITEMS, ORIGINAL_MENU_PAGES, RESTAURANT_INFO } from '../frontend/src/data/restaurantData.js';

const app = express();
const port = Number(process.env.API_PORT || 4000);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({ data: { status: 'ok' }, error: null });
});

app.get('/api/v1/restaurant', (req, res) => {
  res.json({ data: RESTAURANT_INFO, error: null });
});

app.get('/api/v1/menu', (req, res) => {
  const { category, vegetarian } = req.query;
  const query = (req.query.q || '').trim().toLowerCase();
  const page = Math.max(1, Number(req.query.page || 1));
  const limit = Math.min(100, Math.max(1, Number(req.query.limit || 100)));

  const filtered = MENU_ITEMS.filter((item) =>
    (!category || category === 'all' || item.category === category) &&
    (vegetarian == null || String(item.isVeg) === vegetarian) &&
    (!query || `${item.name} ${item.description} ${item.subCategory || ''}`.toLowerCase().includes(query))
  );

  res.json({
    data: {
      items: filtered.slice((page - 1) * limit, page * limit),
      total: filtered.length,
      page,
      limit
    },
    error: null
  });
});

app.get('/api/v1/menu/pages', (req, res) => {
  res.json({ data: ORIGINAL_MENU_PAGES, error: null });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/reservations', reservationRoutes);

app.use((req, res) => {
  res.status(404).json({ data: null, error: { code: 'NOT_FOUND', message: 'API route not found' } });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ data: null, error: { code: 'INTERNAL_ERROR', message: 'Server error' } });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});