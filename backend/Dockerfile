FROM node:14

RUN apt-get update && \
    apt-get install -y graphicsmagick ghostscript && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g nodemon sequelize-cli
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
