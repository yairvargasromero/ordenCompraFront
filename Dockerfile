# Etapa de construcción
FROM node:20-alpine AS build
WORKDIR /usr/src/app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente y construir la aplicación
COPY . .
RUN npm run build

# Etapa de despliegue usando Nginx
FROM nginx:1.17.1-alpine

# Copiar la carpeta build generada en la etapa de construcción
COPY --from=build /usr/src/app/build/ /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 3000, según tu configuración de Nginx
EXPOSE 3000
