const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

// Configuração do JWT (em uma aplicação real, colocaria isso em um arquivo de configuração)
const JWT_SECRET = 'seu_segredo_jwt';
const JWT_EXPIRATION = '24h';

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Usando o método authenticate modificado do userService
    const user = await userService.authenticate(username, password);
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );
    
    res.status(200).json({ 
      message: 'Login bem-sucedido',
      user: {
        id: user.id,
        username: user.username,
        name: user.name
      },
      token 
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

// Validar token (endpoint para testar se o token é válido)
exports.validateToken = (req, res) => {
  // O middleware de autenticação já verifica o token, 
  // então se chegou aqui, o token é válido
  res.status(200).json({ 
    message: 'Token válido', 
    user: req.user 
  });
};

// Registrar novo usuário
exports.register = async (req, res) => {
  try {
    const { username, password, name, email } = req.body;
    
    // Verificar se o usuário já existe
    const existingUser = await userService.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Usuário já existe' });
    }
    
    // Criar o novo usuário
    const newUser = await userService.create({
      username,
      password, // Em uma aplicação real, a senha seria criptografada
      name,
      email
    });
    
    res.status(201).json({ 
      message: 'Usuário registrado com sucesso',
      user: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name
      }
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

// Logout (em APIs REST puras, geralmente é stateless, então o logout é feito no cliente)
exports.logout = (req, res) => {
  // Numa API REST pura, o logout normalmente é tratado no cliente
  // descartando o token, mas podemos fornecer um endpoint para consistência
  res.status(200).json({ message: 'Logout bem-sucedido' });
};