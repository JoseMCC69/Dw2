const app = require('./app');
const userService = require('./services/userService');

// Porta
const PORT = process.env.PORT || 3000;

// Inicializar o banco de dados antes de iniciar o servidor
const startServer = async () => {
  try {
    // Inicializar o pool de conexões com o banco de dados
    await userService.initializePool();
    
    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();