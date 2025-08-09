# Imagen base de Node.js
FROM node:18

# Configurar directorio de trabajo
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación
RUN npm run build

# Instalar servidor HTTP para servir la aplicación
RUN npm install -g serve

# Exponer el puerto 4000
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["serve", "-s", "dist", "-l", "4000"]