# Imagen base de Node.js 14
FROM node:14

# Establece el directorio de trabajo
WORKDIR /app
# Copia los archivos de la aplicación
COPY . /app

# Instala las dependencias de la aplicación
RUN npm install

# Compila la aplicación
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Inicia la aplicación
CMD ["npm", "start"]

