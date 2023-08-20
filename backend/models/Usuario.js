const db = require('../db');

const Livro = require('./Livro.js');

const Usuario = db.sequelize.define('usuarios', {
        id: {
                type: db.Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
        },
        nick: {
                type: db.Sequelize.STRING,
                allowNull: false,
		unique: true
        },
        email: {
                type: db.Sequelize.STRING,
                allowNull: false,
                unique: true
        },
        senha: {
                type: db.Sequelize.STRING,
                allowNull: false
        },
	email_verificado: {
		type: db.Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false
		
	}
})

//Usuario.hasMany(Livro);

/*Livro.belongsTo(Usuario, {
        foreignKey: 'usuario_id',
        constraint: true
});*/

Usuario.hasMany(Livro);
Livro.belongsTo(Usuario);

//db.sequelize.sync({force: true})

module.exports = Usuario;
