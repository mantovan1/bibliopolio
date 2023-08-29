const db = require('../db')

const Favorite = db.sequelize.define('favorites', {
        id: {
            type: db.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
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

module.exports = Favorite;
