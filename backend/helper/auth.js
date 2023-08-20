const jwt = require('jsonwebtoken');

require('dotenv').config()

const verificarTokenUsuario = (req, res, next) => {
        const token = req.headers['x-access-token'];

        if(!token) {
                res.send('Yo, Precisamos do token de autentificação!')
        } else {
                jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                        if(err) {
                                res.json({auth: false, message: 'Falha ao autentificar-se!'});
                        } else {
                                req.usuario_id = decoded.id;
                                next();
                        }
                });
        }
}

module.exports = verificarTokenUsuario;                                                                  
