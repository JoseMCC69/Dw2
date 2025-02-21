FROM node:16-alpine

WORKDIR /app

# Copiar arquivos de configuração primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor porta
EXPOSE 3000

# Iniciar o servidor
CMD ["npm", "start"]