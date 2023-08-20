const db = require('../db')

const Livro = db.sequelize.define('livros', {
        id: {
                type: db.Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
        },
        nome_livro: {
                type: db.Sequelize.STRING,
                allowNull: false
        },
        nome_autor: {
                type: db.Sequelize.STRING,
                allowNull: false
        },
	genero_livro: {
                type: db.Sequelize.STRING,
                allowNull: false
        },
        idioma_livro: {
                type: db.Sequelize.STRING,
                allowNull: false
        },
	nome_arquivo: {
		type: db.Sequelize.STRING,
		allowNull: false
	}
})

//db.sequelize.sync({force: true})

module.exports = Livro;
