import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import downloadRoute from './routes/downloadRoute';
import authRouter from './routes/authRoute';
import songRouter from './routes/songRoute';
import { redisConnect } from './config/redisConnect';
import setupSwagger from './config/swagger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

redisConnect();

app.use(cors({
  origin: ['http://127.0.0.1:3000', 'https://synkro-music.vercel.app'],
  credentials: true
}));

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.use('/api/download', downloadRoute)

app.use('/api/auth', authRouter);
app.use('/api/songs', songRouter);

app.get('/api/', (req, res) => {
  const userId = req.user?.id;
  res.json({
    message: 'Server is running!',
    userId: userId || 'Unauthorized User'
  }); 
});

setupSwagger(app);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});