const express = require('express');
const router = express.Router();
const CommentRepository = require('../repositories/CommentRepository.js');
const verifyUserToken = require('../helper/auth.js');

router.post('/publish',
verifyUserToken,
async(req, res) => {
	try {
		const bookId = req.body.bookId;
		const text = req.body.text;
		const userId = req.user.id;
		
		const createdComment = await Commentepository.post(userId, bookId, text);
		if(createdComment) {
			return res.status(200).json(createdComment);
		} else {
			throw new Error('algo deu errado');
		}
	} catch(err) {
		return res.status(500).send(err);
	}
	
});


module.exports = router;

