import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

<<<<<<< HEAD:src/index.ts
app.use(cors({
  origin: 'http://127.0.0.1:3000',
  credentials: true
}));

app.set('views', path.join(__dirname, 'views'));

=======
>>>>>>> origin/main:src/app.ts
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.use('/api', authRoutes);

app.get('/api/', (req, res) => {
  const userId = req.user?.id;
  res.json({
    message: 'Server is running!',
    userId: userId || 'Unauthorized User'
  }); 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});