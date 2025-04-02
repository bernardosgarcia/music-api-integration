import express from 'express';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear o JSON
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send('Servidor Express com TypeScript está funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});