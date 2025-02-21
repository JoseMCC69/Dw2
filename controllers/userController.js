const userService = require('../services/userService');

// Obter todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAll();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro interno ao buscar usuários' });
  }
};

// Obter usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.status(200).json({ user });
  } catch (error) {
    console.error('Erro ao buscar usuário específico:', error);
    res.status(500).json({ error: 'Erro interno ao buscar usuário' });
  }
};

// Criar novo usuário
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userService.create(userData);
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao criar usuário' });
  }
};

// Atualizar usuário
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUser = await userService.update(userId, userData);
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar usuário' });
  }
};

// Excluir usuário
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await userService.delete(userId);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro interno ao excluir usuário' });
  }
};