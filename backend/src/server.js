import express from 'express';
import 'dotenv/config';
import cors from 'cors'

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
}))
app.use('/api/notes', notesRoutes);

connectDB().then(()=>{
  app.listen(5001, () => {
    console.log('Server is running on port: ', PORT);
  });
});