require('dotenv').config();
const express = require('express');
const router = express.Router();
const transporter = require('../helper/transporter.js');
var rand,mailOptions,host,link;

router.get('/message2us', async (req, res) => {
    try {
        const { title, paragraph } = req.query;
        mailOptions={
            from: 'Gustavo Mantovani <gustavo.mantovani@sportmove.com.br>',
            to : 'gu.mantovane@gmail.com',
            subject : title,	
            html : paragraph
        }
        
        transporter.sendMail(mailOptions, function(error, response){
            if(error){
                res.send("error");
            }else{
                res.status(200).json({ message: 'Data received successfully' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while receiving data' });
    }
});

module.exports = router;