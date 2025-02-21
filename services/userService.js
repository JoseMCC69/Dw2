const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

let pool;

// Inicializar a conexão com o banco de dados
const initializePool = async () => {
  const env = process.env.NODE_ENV || 'development';
  const config = dbConfig[env];
  
  pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Testar a conexão
  try {
    const connection = await pool.getConnection();
    console.log('Conexão com o banco de dados estabelecida com sucesso');
    connection.release();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
};

// Autenticar usuário
const authenticate = async (username, password) => {
  if (!pool) await initializePool();
  
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );
    
    if (rows.length === 0) {
      return null;
    }
    
    return rows[0];
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    throw error;
  }
};

// Obter todos os usuários
const getAll = async () => {
  if (!pool) await initializePool();
  
  try {
    const [rows] = await pool.execute('SELECT id, username, name, email FROM users');
    return rows;
  } catch (error) {
    console.error('Erro ao buscar todos os usuários:', error);
    throw error;
  }
};

// Obter usuário por ID
const getById = async (id) => {
  if (!pool) await initializePool();
  
  try {
    const [rows] = await pool.execute(
      'SELECT id, username, name, email FROM users WHERE id = ?',
      [id]
    );
    
    if (rows.length === 0) {
      return null;
    }
    
    return rows[0];
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    throw error;
  }
};

// Encontrar usuário por nome de usuário
const findByUsername = async (username) => {
  if (!pool) await initializePool();
  
  try {
    const [rows] = await pool.execute(
      'SELECT id, username, name, email FROM users WHERE username = ?',
      [username]
    );
    
    if (rows.length === 0) {
      return null;
    }
    
    return rows[0];
  } catch (error) {
    console.error('Erro ao buscar usuário por username:', error);
    throw error;
  }
};

// Criar usuário
const create = async (userData) => {
  if (!pool) await initializePool();
  
  try {
    const { username, password, name, email } = userData;
    
    const [result] = await pool.execute(
      'INSERT INTO users (username, password, name, email) VALUES (?, ?, ?, ?)',
      [username, password, name, email]
    );
    
    return {
      id: result.insertId,
      username,
      name,
      email
    };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

// Atualizar usuário
const update = async (id, userData) => {
  if (!pool) await initializePool();
  
  try {
    const { username, name, email, password } = userData;
    
    // Construir a query dinâmica com base nos campos fornecidos
    let query = 'UPDATE users SET ';
    const queryParams = [];
    const updateFields = [];
    
    if (username) {
      updateFields.push('username = ?');
      queryParams.push(username);
    }
    
    if (name) {
      updateFields.push('name = ?');
      queryParams.push(name);
    }
    
    if (email) {
      updateFields.push('email = ?');
      queryParams.push(email);
    }
    
    if (password) {
      updateFields.push('password = ?');
      queryParams.push(password);
    }
    
    query += updateFields.join(', ') + ' WHERE id = ?';
    queryParams.push(id);
    
    const [result] = await pool.execute(query, queryParams);
    
    if (result.affectedRows === 0) {
      return null;
    }
    
    // Buscar o usuário atualizado
    return await getById(id);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

// Excluir usuário
const deleteUser = async (id) => {
  if (!pool) await initializePool();
  
  try {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    throw error;
  }
};

module.exports = {
  authenticate,
  getAll,
  getById,
  findByUsername,
  create,
  update,
  delete: deleteUser,
  initializePool
};