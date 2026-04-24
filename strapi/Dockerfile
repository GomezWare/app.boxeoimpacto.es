# Dockerfile simple para Strapi en producción
FROM node:24-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache libc6-compat

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Construir Strapi
RUN npm run build

# Crear directorio para base de datos
RUN mkdir -p database

# Exponer puerto
EXPOSE 1337

# Comando para ejecutar Strapi
CMD ["npm", "start"] 