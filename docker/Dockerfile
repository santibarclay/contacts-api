# Usar una imagen base de Node.js oficial
FROM node:18-alpine

# Crear directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json primero para aprovechar la caché de capas de Docker
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto 8081 que usa nuestra aplicación
EXPOSE 8081

# Comando para iniciar la aplicación
CMD ["node", "src/server.js"]