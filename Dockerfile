# Etapa de construcción
FROM node:20-alpine AS build
WORKDIR /usr/src/app
# Install app dependencies based on package-lock.json
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 
# Bundle app source
# Port exposed on server

# BUILD
FROM node:20-alpine
WORKDIR /usr/src/app/
RUN apk add --no-cache

COPY package.json .
RUN npm install

COPY --from=build /usr/src/app/dist/. /usr/src/app/dist/

EXPOSE 3000

CMD ["npm","start"]