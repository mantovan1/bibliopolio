const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken');
const verifyUserToken = require('../helper/auth.js');
const transporter = require('../helper/transporter.js');

const User = require('../models/User.js');
const UserRepository = require('../repositories/UserRepository.js');
const BookRepository = require('../repositories/BookRepository.js');

router.post('/signup', async (req, res) => {
        try {
                console.log('acionado');
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Methods", 'POST');
                const name = req.body.name;
                const email = req.body.email;
                const pass = req.body.pass;
                const user = {
                        name: name,
                        email: email,
                        pass: pass
                };
                console.log(user);
                const token = jwt.sign({user}, process.env.TOKEN_SECRET, {
                        expiresIn: '180d',
                });

                host=req.get('host');
                link=`http://${host}/user/createaccount/${token}`;
                mailOptions={
                        to : email,
                        subject : "Please confirm your Email account",	
                        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
                }
                transporter.sendMail(mailOptions, function(error, response){
                if(error){
                        res.send("error");
                }else{
                        console.log('deu certo')
                        return res.status(200).send("sent");
                }
                });
        } catch(err) {
                console.log(err);
                return res.status(500).send(err);
        }
});

router.get('/createaccount/:token', verifyUserToken, async(req, res) => {
        try {
                const user = req.user;
                const createdUser = await UserRepository.createUser(
                        user.name,
                        user.email,
                        user.pass
                );
                if(createdUser) {
                        delete createdUser['pass'];
                        console.log(createdUser);
                        const token = jwt.sign({createdUser}, process.env.TOKEN_SECRET, {
                                expiresIn: '180d',
                        });
                        return res.status(200).redirect(`http://192.168.15.152:3000/saveuser/${token}`);
                } else {
                        return res.status(400).send('something went wrong');
                }
        } catch(err) {
                return res.status(500).send(err);
        }
});

router.get('/yourinfo', verifyUserToken, async(req, res) => {
        return res.status(200).json(req.user);
})

router.post('/login', async (req, res) => {
	try {
                const email = req.body.email;
                const pass = req.body.pass;
                const result = await User.findOne({ where: {email: email} });
                if (result) {
                        if(result.pass == pass) {
                                const user = result;
                                const token = jwt.sign({user}, process.env.TOKEN_SECRET, {
                                        expiresIn: '180d',
                                });
                                delete result.dataValues['pass'];
                		res.json({auth: true, token: token, result: result.dataValues});
                        } else {
                                console.log("email/pass errados!");
                                res.json({auth: false, message: 'Nome/pass errados!'});
                        }
                } else {
                        console.log("Usuário não existe");
                        res.json({auth: false, message: 'Usuário não existe'});
                }
        } catch (e) {
                res.status(404);
        }
});

/*

router.get('/youruploads', verifyUserToken ,async (req, res) => {
        try {
                const userId = req.params.userId;
                const books = await BookRepository.findByColumn('userId', userId);
                return res.status(200).json({books: books});
        } catch(err) {
                return res.status(500).send(err);
        }
});
*/

module.exports = router;