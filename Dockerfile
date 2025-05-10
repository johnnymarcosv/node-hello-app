FROM node:22-slim

WORKDIR /app

# Copiar primero solo los archivos necesarios para instalar dependencias
COPY package*.json ./

RUN npm install

# Luego copiar el resto de los archivos (incluido index.js)
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
