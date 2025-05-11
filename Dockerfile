FROM node:22-slim

WORKDIR /app

# Instalar curl y limpiar caché
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copiar primero los archivos necesarios para instalar dependencias
COPY package*.json ./

RUN npm install

# Luego copiar el resto del código fuente
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
