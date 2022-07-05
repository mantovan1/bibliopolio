//models

const Usuario = require('./models/Usuario.js');
const Livro = require('./models/Livro.js');

const fs = require('fs');

//configuration of nodemailer

const nodemailer = require('nodemailer');

require('dotenv').config();

let transporter = nodemailer.createTransport({
	service: "hotmail",
	auth: {
		user: process.env.AUTH_EMAIL,
		pass: process.env.AUTH_PASSWORD
	},
});

var rand,mailOptions,host,link;

const db = require('./db.js');

//express

const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express');
const app = express();

app.use(express.static('thumbs'));
app.use(express.static('uploads'));

const jwt = require('jsonwebtoken');

const verificarTokenUsuario = require('./helper/auth.js');

const multer = require('multer');
const { uuid } = require('uuidv4')

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads/',
    filename(req, file, callback) {
      const originalName = file.originalname.replace(/\s+/g, '').trim();	    
      const fileName = `${uuid()}-${originalName}`

      return callback(null, fileName)
    },
  }),
})

const { exec } = require("child_process");


//routes

app.use(bodyParser.json());

app.use(cors());

app.get('/download/:nome_arquivo', async (req, res) => {

	const livro = await Livro.findOne({ attributes: ['id'] , where: {nome_arquivo: req.params.nome_arquivo} });
	
	const filePath = './uploads/' + req.params.nome_arquivo;

	//res.send(filePath);

	res.download(filePath, function(error){
        	if(error) {

			console.log("Error : ", error)
    		
		} else {
			
			console.log("Download Concluído com sucesso!");

		}
	});

})

app.post('/usuario-download', verificarTokenUsuario, async (req, res) => {

	const nome_arquivo = req.body.nome_arquivo;

	console.log(nome_arquivo);

        const livro = await Livro.findOne({ attributes: ['id', 'nome_arquivo'] , where: {nome_arquivo: nome_arquivo} });

	try {

        	const filePath = './uploads/' + nome_arquivo;

        	res.download(filePath, function(error){
                	if(error) {
	
        	                console.log("Error : ", error)

                	} else {
	
        	                console.log("Download Concluído!");

				var obj = require('./downloads_list/f.json');			

                                obj.downloads.push({uuid: uuid(),  usuario_id: req.usuario_id, nome_arquivo: livro.nome_arquivo, horario: new Date()})

                                var json = JSON.stringify(obj);

				console.log(obj);

                                fs.writeFile('./downloads_list/f.json', json, 'utf8', function (err) {
					console.log(err);
				});
                        

                	}
        	});

	} catch (err) {
		console.log(err);
	}	
});

//usuário

app.post('/cadastro-usuario', async (req, res) => {
	const nick = req.body.nick;
	const email = req.body.email;
	const senha = req.body.senha;

	await Usuario.create({
        	nick: nick,
                email: email,
                senha: senha
        })
	.then(async function (success) {
		res.json({mensagem: 'Cadastrado com sucesso'});

		const result = await Usuario.findOne({ attributes: ['id', 'nick', 'email', 'email_verificado'] , where: {email: email} });

		const id = result.id
                const token = jwt.sign({id}, process.env.TOKEN_SECRET, {
                        expiresIn: '180d',
                });

		res.json({auth: true, token: token, result: result.dataValues});

	})
	.catch(function(erro) {
                res.json({mensagem: 'Houve um erro'});
        });


});

app.post('/login-usuario', async (req, res) => {

	try {
                const email = req.body.email;
                const senha = req.body.senha;

                const result = await Usuario.findOne({ where: {email: email} });

                if (result) {
                        if(result.senha == senha) {
                                const id = result.id
                                const token = jwt.sign({id}, process.env.TOKEN_SECRET, {
                                        expiresIn: '180d',
                                });

                                delete result.dataValues['senha'];

                		res.json({auth: true, token: token, result: result.dataValues});
                                
                        } else {
                                console.log("email/senha errados!");
                                res.json({auth: false, message: 'Nome/senha errados!'});
                        }
                } else {
                        console.log("Usuário não existe");
                        res.json({auth: false, message: 'Usuário não existe'});
                }
        } catch (e) {
                res.status(404);
        }

})

app.get('/seus-downloads-usuario', verificarTokenUsuario, async (req, res) => {

	let rawdata = fs.readFileSync('./downloads_list/f.json');
	let obj = JSON.parse(rawdata);

	const listaUsuario = [];

	for(var i = 0; i < obj.downloads.length; i++) {

		if(obj.downloads[i].usuario_id == req.usuario_id) {
			listaUsuario.push({nome_arquivo: obj.downloads[i].nome_arquivo, horario: obj.downloads[i].horario});
		}

	}

	res.json(listaUsuario);

	//console.log(student);

})

app.get('/seus-uploads-usuario', verificarTokenUsuario ,async (req, res) => {

        res.header("Access-Control-Allow-Origin", "*");
        
        res.header("Access-Control-Allow-Methods", 'GET');

        const livros = await Livro.findAll({attributes: ['usuarioId', 'nome_livro', 'nome_autor', 'genero_livro', 'idioma_livro', 'nome_arquivo', 'createdAt'], where: {usuarioId: req.usuario_id} });

        return res.json(livros);

})

//livro

app.post('/cadastro-livro', upload.single('arquivo'), verificarTokenUsuario, async (req, res) => {
	
	const { filename, size } = req.file;

	const nome_livro = req.body.nome_livro;
	const nome_autor = req.body.nome_autor;
	const genero_livro = req.body.genero_livro;
	const idioma_livro = req.body.idioma_livro;
	
	const nome_arquivo = filename.replace(/\s+/g, '').trim();

	const nome_arquivo_sem_extensao = nome_arquivo.replace('.pdf', '');

	await Livro.create({
                nome_livro: nome_livro,
                nome_autor: nome_autor,
                genero_livro: genero_livro,
		idioma_livro: idioma_livro,
		nome_arquivo: nome_arquivo,
		usuarioId: req.usuario_id
        })
	.then(function(success) {
		res.send("Livro cadastrado com sucesso");
	})
	.catch(function (err) {
		res.send("Erro: " + err);
	})

	//res.send("ok")

})

app.get('/listar-livros', async (req, res) => {

	res.header("Access-Control-Allow-Origin", "*");
	
    	res.header("Access-Control-Allow-Methods", 'GET');

	const livros = await Livro.findAll({attributes: ['usuarioId', 'nome_livro', 'nome_autor', 'genero_livro', 'idioma_livro', 'nome_arquivo'] });
        
	return res.json(livros);

})

app.get('/buscar-livros/:pesquisa', async (req, res) => {

        res.header("Access-Control-Allow-Origin", "*");
        
        res.header("Access-Control-Allow-Methods", 'GET');

	const pesquisa = req.params.pesquisa;

	const [results, metadata] = await db.sequelize.query("SELECT usuarioId, nome_livro, nome_autor, genero_livro, idioma_livro, nome_arquivo from livros where nome_livro like '%" + pesquisa + "%' or nome_autor like '%" + pesquisa + "%';");

        return res.json(results);

})

app.post('/livros', async (req, res) => {

        res.header("Access-Control-Allow-Origin", "*");
        
        res.header("Access-Control-Allow-Methods", 'GET');

	const listaLivrosId = req.body.listaLivrosId;

	const livrosInfo = [];

	for(var i = 0; i < listaLivrosId.length; i++) {
		const livro = await Livro.findOne({attributes: ['usuarioId', 'nome_livro', 'nome_autor', 'genero_livro', 'idioma_livro', 'nome_arquivo'], where: { id : listaLivrosId[i].livro_id } });
	
		livrosInfo.push(livro);

	}

        return res.json(livrosInfo);

})



//email verification

app.get('/send/:to',function(req,res){
        rand=Math.floor((Math.random() * 100) + 54);
    	host=req.get('host');
    	link="http://"+req.get('host')+"/verify/"+rand;
    	mailOptions={
        	to : req.params.to,
        	subject : "Please confirm your Email account",	
		html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    	}
    	
	//console.log(mailOptions);
    	
	transporter.sendMail(mailOptions, function(error, response){
     	    if(error){
                console.log(error);
                res.send("error");
     	    }else{
            	console.log("Message sent: " + response.message);
            	res.send("sent");
            }
	});

});

app.get('/verify/:id',function(req,res){
	
	if((req.protocol+"://"+req.get('host'))==("http://"+host)) {
    		console.log("Domain is matched. Information is from Authentic email");
    		if(req.params.id==rand) {
        		console.log("email is verified");
        		res.send("<h1>Email "+mailOptions.to+" is been Successfully verified");
    		} else {
        		console.log("email is not verified");
        		res.send("<h1>Bad Request</h1>");
    		}
	} else {
    		res.send("<h1>Request is from unknown source");
	}
});

//end of routes

app.listen(8080, async function() {
	console.log('Servidor rodando na porta 8080');

	//

	await exec("./pdf-cover-transformation.sh", (error, stdout, stderr) => {
        if (error) {
                console.log(`error: ${error.message}`);
                return;
        }

        if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
        }

        console.log(`stdout: ${stdout}`);
	});

});
