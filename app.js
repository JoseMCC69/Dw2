const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const apiDocs = require('./docs/api-docs');

// Importar rotas
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const openApiRoutes = require('./routes/openApiRoutes');

// Inicializar o app Express
const app = express();

// Middleware básico
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    docExpansion: 'list',
    filter: true,
    showRequestDuration: true,
  }
}));

// Rotas da API
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/docs', openApiRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo à API de autenticação',
    docs: '/api-docs',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      docs: '/api/docs'
    }
  });
});

// Middleware para rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Erro interno no servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;