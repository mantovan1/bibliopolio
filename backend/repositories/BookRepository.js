const Book = require('../models/Book.js');
const db = require('../db.js');

async function saveBook(title, author_name, genre, filename, userId, desc=null) {
    try {
        const bookData = {
            title: title,
            author_name: author_name,
            genre: genre,
            filename: filename,
            userId: userId
        };

        if (desc !== null) {
            bookData.desc = desc;
        }

        const createdBook = await Book.create(bookData);

        return createdBook;
    } catch (err) {
        return "Erro: " + err.message; // Return the error message
    }
}

async function getAll() {
    const books = await Book.findAll();
    return books;
}

async function search(term) {
    const [results, metadata] = await db.sequelize.query(`
    SELECT
    id,
    userId,
    title,
    author_name,
    genre,
    filename
    FROM books WHERE
    title like '%${term}%';`);
    return results;
}

async function findByColumn(columnName, columnValue) {
    try {
        const queryOptions = {
        attributes: ['userId', 'title', 'author_name', 'genre', 'filename', 'createdAt'],
        where: { [columnName]: columnValue }
        };
    
        const books = await Book.findAll(queryOptions);
        return books;
    } catch(err) {
        return "Erro: " + err.message;
    }
}
  

module.exports = Object.freeze({
    saveBook,
    getAll,
    search,
    findByColumn
})
