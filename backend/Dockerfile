FROM node:20-alpine

WORKDIR /usr/src/app

# Copiamos archivos de dependencias
COPY package.json yarn.lock ./

# Instalamos dependencias (frozen-lockfile asegura que use exactamente el lock)
RUN yarn install --frozen-lockfile

# Copiamos el resto del código
COPY . .

# Exponemos el puerto de Nest
EXPOSE 3000

# Ejecutamos en modo desarrollo
CMD ["yarn", "start:dev"]