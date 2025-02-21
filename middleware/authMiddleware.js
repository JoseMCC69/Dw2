const jwt = require('jsonwebtoken');
const JWT_SECRET = 'seu_segredo_jwt'; // Em uma aplicação real, isso estaria em um arquivo de configuração

// Middleware para verificar token JWT
exports.verifyToken = (req, res, next) => {
  // Obter o token do header Authorization
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }
  
  // O formato típico é "Bearer [token]"
  const parts = authHeader.split(' ');
  
  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Erro no formato do token' });
  }
  
  const [scheme, token] = parts;
  
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }
  
  // Verificar o token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expirado' });
      }
      
      return res.status(401).json({ error: 'Token inválido' });
    }
    
    // Adicionar o usuário decodificado à requisição
    req.user = decoded;
    return next();
  });
};

// Middleware para verificar o papel do usuário (opcional)
exports.checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }
    
    next();
  };
};