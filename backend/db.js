const Sequelize = require('sequelize');

//require('dotenv').config();

require('dotenv').config({ path: require('find-config')('.env') })

// Conexão com o banco de dados MySQL
const sequelize = new Sequelize({
    host: 'db', // Nome do serviço no Docker Compose
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
});

module.exports = {

    Sequelize: Sequelize,
    sequelize: sequelize

}

