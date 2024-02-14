# Version de la imagen
FROM node:18.16

# Creacion del directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la API a la imagen y de las dependencias al repositorio creado dentro de el container
COPY package.json ./
COPY . /app/

# Instalamos las dependencias de la API
RUN npm install

# Puerto en el que la API escuchará desde el contenedor
EXPOSE 3000

# Comando para iniciar la API
CMD [ "node", "/app/src/app.js" ]
