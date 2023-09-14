const db = require('../db')

const Book = db.sequelize.define('books', {
        id: {
                type: db.Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
        },
        title: {
                type: db.Sequelize.STRING,
                allowNull: false
        },
        author_name: {
                type: db.Sequelize.STRING,
                allowNull: false
        },
	genre: {
                type: db.Sequelize.STRING,
                allowNull: false
        },
	filename: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
        userId: {
                type: db.Sequelize.INTEGER,
                allowNull: false
        },
        desc: {
                type: db.Sequelize.STRING,
                allowNull: true
        },
	format: {
		type: db.Sequelize.STRING(3),
		allowNull: true
	}
});

module.exports = Book;
