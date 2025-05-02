import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: 'http://127.0.0.1:3000',
  credentials: true
}));

app.use(routes);

app.get('/', (req, res) => {
  res.status(200)
});

app.listen(port, () => {
  console.log(`Server is running on port 3003 kk - ${port}`);
});