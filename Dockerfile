FROM node:22-slim

WORKDIR /app

COPY . .

RUN echo 'console.log("Hello from Node inside Docker!")' > index.js
RUN npm init -y

EXPOSE 3000
CMD ["node", "index.js"]
