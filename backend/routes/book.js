const express = require('express');
const router = express.Router();
const { uuid } = require('uuidv4');
const { v4 } = require('uuid');
const fs = require('fs');
const verifyUserToken = require('../helper/auth.js');
const BookRepository = require('../repositories/BookRepository.js');
const multer = require('multer');
const uploadFile = require('../helper/uploadFile.js');
const extractCover = require('../helper/extractCover.js');
const s3 = require('../helper/s3Config.js');

const destinationFolder = 'uploads/';

if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
}


const upload = multer({
    dest: destinationFolder,
});

router.get('/list', async (req, res) => {
    try {
        const books = await BookRepository.getAll();
        return res.status(200).json(books);
    } catch(err) {
        return res.status(500).send(err);
    }
})

router.get('/search/:term', async (req, res) => {
    try {
        const term = req.params.term;
        const books = await BookRepository.search(term);
        return res.status(200).json(books);
    } catch(err) {
        return res.status(500).send(err);
    }
})

router.get('/cover/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const bookArray = await BookRepository.findByColumn('id', bookId);
        const book = bookArray.length > 0 ? bookArray[0] : null;

        if (book) {
            const getObjectParams = {
                Bucket: 'bibliopolio',
                Key: `${book.filename}.${'png'}`
            };

            const fileStream = s3.getObject(getObjectParams).createReadStream();
            res.setHeader('Content-Type', 'image/png'); // Corrected header
            res.setHeader('Content-Disposition', `attachment; filename="${bookId}.png"`);
            fileStream.pipe(res);
        } else {
            return res.status(404).send('Book not found');
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred while processing the request.");
    }
});

router.get('/download/:format/:id', async (req, res) => {
    try {
        const format = req.params.format;
        const bookId = req.params.id;
        const bookArray = await BookRepository.findByColumn('id', bookId);
        const book = bookArray.length > 0 ? bookArray[0] : null;

        if(book) { 
            const getObjectParams = {
                Bucket: 'bibliopolio',
                Key: `${book.filename}.${format}`
            };
            
            const fileStream = s3.getObject(getObjectParams).createReadStream();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${bookId}.pdf"`);
            fileStream.pipe(res);
        } else {
            return res.status(200).send('ok');
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred while processing the request.");
    }
});

router.post('/upload', upload.single('file'), verifyUserToken, async (req, res) => {
	try {
        const file = req.file;
        file.originalname = `${v4()}-${file.originalname}`;
        const filename = file.originalname.replace('.pdf', '').replace('.epub', '');
	const format = file.originalname.slice(-3);

        const userId = req.user.id;
        const title = req.body.title;
        const author_name = req.body.author_name;
        const genre = req.body.genre;
        const desc = req.body.desc;

        let image = {'originalname':'', 'path':''};
        if(file.mimetype == 'application/pdf') {
            image = await extractCover.fromPDF(file);
        } else if(file.mimetype == 'application/epub+zip') {
            const resolve = await extractCover.fromEPUB(file);
            parts = resolve.split('/');
            image.originalname = parts[parts.length -1];
            image.path = resolve;
        } else  {
            throw new Error('Invalid file format');
        }
        await uploadFile(image);
        await uploadFile(file);

        const result = await BookRepository.saveBook(
            title,
            author_name,
            genre,
            filename,
            userId,
            desc,
	    format
        );
        if(result) {
            return res.status(200).json({uploaded: result});
        } else {
            return res.status(500).send('something went wrong');
        }
    } catch(err) {
        return res.status(500).send(err.message);
    }
	
});

module.exports = router;
