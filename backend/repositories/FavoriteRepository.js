const Favorite = require('../models/Favorite.js');

async function add(userId, bookId) {
    const result = await Favorite.create({
        userId: userId,
        bookId: bookId
    });
    return result;
}

async function remove(userId, bookId) {
    const result = await Favorite.destroy({
        where: {
            userId: userId,
            bookId: bookId
        }
    });
    return result;
}

async function getListFromUser(userId) {
    try {
        const listFavorites = await Favorite.findAll({
            where: {
                userId: userId
            }
        });
        return listFavorites;
    } catch(err) {
        return "Err: " + err;
    }
}

async function check(userId, bookId) {
    try {
        const result = await Favorite.findOne({
            where: {
                userId: userId,
                bookId: bookId
            }
        });
        return result;
    } catch(err) {

    }
}

module.exports = Object.freeze({
    add,
    remove,
    getListFromUser,
    check
})