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
                        return res.status(200).json({message: 'Enviamos um Email para confirmação da su conta'});
                }
                });
        } catch(err) {
                return res.status(500).send(err);
        }
});

router.get('/createaccount/:token', verifyUserToken, async(req, res) => {
        try {
                let user = req.user;
                const result = await UserRepository.createUser(
                        user.name,
                        user.email,
                        user.pass
                );
                user = result?.dataValues;
                if(user) {
                        delete user['pass'];
                        const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
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
                                res.json({auth: false, message: 'Nome/pass errados!'});
                        }
                } else {
                        res.json({auth: false, message: 'Usuário não existe'});
                }
        } catch (e) {
                res.status(404);
        }
});

module.exports = router;