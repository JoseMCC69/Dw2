-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserir alguns usuários de exemplo
INSERT INTO users (username, password, name, email, role) VALUES
('admin', 'admin123', 'Administrador', 'admin@example.com', 'admin'),
('usuario', 'senha123', 'Usuário Comum', 'usuario@example.com', 'user'),
('teste', 'teste123', 'Usuário de Teste', 'teste@example.com', 'user');