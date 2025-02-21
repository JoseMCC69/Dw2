const express = require('express');
const router = express.Router();
const openApiController = require('../controllers/openApiController');

// Rotas públicas para documentação da API
router.get('/info', openApiController.getApiInfo);
router.get('/spec', openApiController.getOpenApiSpec);

module.exports = router;