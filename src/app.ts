import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor Express com TypeScript está funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});