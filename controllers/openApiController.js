// Controller para endpoints relacionados à documentação OpenAPI

// Retorna informações básicas sobre a API
exports.getApiInfo = (req, res) => {
    const apiInfo = {
      name: "Auth Tutorial API",
      version: "1.0.0",
      description: "API de autenticação para tutorial",
      endpoints: [
        { path: "/api/users", methods: ["GET", "POST"], description: "Gerenciamento de usuários" },
        { path: "/api/users/:id", methods: ["GET", "PUT", "DELETE"], description: "Operações em usuário específico" },
        { path: "/api/auth/login", methods: ["POST"], description: "Autenticação de usuário" },
        { path: "/api/auth/register", methods: ["POST"], description: "Registro de novo usuário" }
      ]
    };
    
    res.status(200).json(apiInfo);
  };
  
  // Retorna a especificação OpenAPI completa
  exports.getOpenApiSpec = (req, res) => {
    // Aqui você retornaria a especificação OpenAPI completa
    // Isso geralmente é feito pelo arquivo api-docs.js ou pelo swagger-jsdoc
    res.redirect('/api-docs');
  };