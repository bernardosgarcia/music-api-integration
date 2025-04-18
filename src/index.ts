import express from 'express';
import dotenv from 'dotenv';
import { authSpotify } from './middlewares/authSpotify';
import authRoutes from './routes/auth';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(authSpotify);

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