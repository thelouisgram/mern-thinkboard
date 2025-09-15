import express from 'express';
import 'dotenv/config';
import cors from 'cors'
import path from 'path';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware to parse JSON bodies
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
app.use(cors({
  origin: 'http://localhost:5173',
}))
}

app.use('/api/notes', notesRoutes);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

if (process.env.NODE_ENV === 'production') {
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
}
);
}

connectDB().then(()=>{
  app.listen(5001, () => {
    console.log('Server is running on port: ', PORT);
  });
});