const db = require('../db')

const Comment = db.sequelize.define('comments', {
        id: {
            type: db.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        userId: {
            type: db.Sequelize.INTEGER,
            allowNull: false
        },
        bookId: {
            type: db.Sequelize.INTEGER,
            allowNull: false
        }
});

module.exports = Comment;
