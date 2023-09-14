const jwt = require('jsonwebtoken');

require('dotenv').config()

const verifyUserToken = (req, res, next) => {
        const token = req.headers['x-access-token']?req.headers['x-access-token']:req.params.token;

        if(!token) {
                res.status(401).send('Yo, Precisamos do token de autentificação!')
        } else {
                jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                        if(err) {
                                res.json({auth: false, message: 'Falha ao autentificar-se!'});
                        } else {
                                req.user = decoded.user;
                                next();
                        }
                });
        }
}

module.exports = verifyUserToken;                                                                  
