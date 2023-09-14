'use strict';

module.exports = {
	 async up (queryInterface, Sequelize) {
	 	await queryInterface.addColumn('books', 'format', {
	      		type: Sequelize.STRING,
	      		allowNull: true,
	    	})
	 },

  	async down (queryInterface, Sequelize) {
    		await queryInterface.removeColumn('books', 'format');
  	}
};
