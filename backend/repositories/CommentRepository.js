const Comment = require('../models/Comment.js');

async function post(userId, bookId, text) {
    const result = await Comment.create({
        userId: userId,
        bookId: bookId,
	text: text
    });
    return result;
}

async function remove(userId, bookId) {
    const result = await Comment.destroy({
        where: {
            userId: userId,
            bookId: bookId
        }
    });
    return result;
}

async function listComments(bookId) {
    try {
        const listComments = await Comment.findAll({
            where: {
                bookId: bookId
            }
        });
        return listComments;
    } catch(err) {
        return "Err: " + err;
    }
}

async function check(userId, bookId) {
    try {
        const result = await Comment.findOne({
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
    post,
    remove,
    listComments,
    check
})
