const express = require('express');
const router = express.Router();
const verifyUserToken = require('../helper/auth.js');
const FavoriteRepository = require('../repositories/FavoriteRepository.js');


router.get('/', verifyUserToken, async(req, res) => {
    const userId = req.user.id;
    const listFavorites = await FavoriteRepository.getListFromUser(userId);
    return res.status(200).json(listFavorites);
});

router.get('/:bookId', verifyUserToken,  async(req, res) => {  
    try {
        const userId = req.user.id;
        const bookId = req.params.bookId;
        const result = await FavoriteRepository.add(userId, bookId)
        if(result) {
            return res.status(200).json(result);
        } else {
            throw new Error('something went wrong');
        }
    } catch(err) {
        return res.status(500).send(err);
    }
});

router.get('/check/:bookId', verifyUserToken,  async(req, res) => {  
    try {
        const userId = req.user.id;
        const bookId = req.params.bookId;
        const result = await FavoriteRepository.check(userId, bookId);
        if(result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({message: 'not found'});
        }
    } catch(err) {
        return res.status(500).send(err);
    }
});

router.get('/remove/:bookId', verifyUserToken,  async(req, res) => {  
    try {
        const userId = req.user.id;
        const bookId = req.params.bookId;
        const result = await FavoriteRepository.remove(userId, bookId)
        if(result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({message: 'not found'});
        }
    } catch(err) {
        return res.status(500).send(err);
    }
});

module.exports = router;