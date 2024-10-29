# Dockerfile para el frontend
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Construye la aplicación de frontend
RUN npm run build

# Usa un servidor para el contenido estático
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
