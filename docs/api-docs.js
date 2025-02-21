const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth Tutorial API',
      version: '1.0.0',
      description: 'API de autenticação para tutorial',
      contact: {
        name: 'Desenvolvedor',
        email: 'dev@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID do usuário'
            },
            username: {
              type: 'string',
              description: 'Nome de usuário'
            },
            name: {
              type: 'string',
              description: 'Nome completo'
            },
            email: {
              type: 'string',
              description: 'Email do usuário'
            },
            role: {
              type: 'string',
              description: 'Papel do usuário (admin/user)'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Autenticação',
        description: 'Endpoints relacionados à autenticação'
      },
      {
        name: 'Usuários',
        description: 'Endpoints relacionados ao gerenciamento de usuários'
      }
    ]
  },
  apis: ['./routes/*.js'], // Arquivos que contêm anotações para o Swagger
};

const specs = swaggerJsdoc(options);

module.exports = specs;