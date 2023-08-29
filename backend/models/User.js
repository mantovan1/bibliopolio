const db = require('../db');

const User = db.sequelize.define('users', {
        id: {
                type: db.Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
        },
        name: {
                type: db.Sequelize.STRING,
                allowNull: false,
		        unique: true
        },
        email: {
                type: db.Sequelize.STRING,
                allowNull: false,
                unique: true
        },
        pass: {
                type: db.Sequelize.STRING,
                allowNull: false
        }
});

module.exports = User;