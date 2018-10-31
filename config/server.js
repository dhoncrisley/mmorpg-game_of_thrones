/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* importar o módulo do express-session */
var expressSession = require('express-session');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator */
app.use(expressValidator());

/* configurar o middleware express-validator */
app.use(expressSession({//pede um json com 3 atributos
	secret: 'UAHSEUhusheuhse',//a chave secreta, você pode criar ou gerar qualquer chave ou senha hash
	resave: false, //pergunta se você quer re-salvar o id do cookie a cada requisição, nesse caso não
	saveUninitialized: false// pergunta se você quer iniciar um novo id do cookie a cada sessão
}));


/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/models')
	.then('config/dbConnection.js') /* no caso do banco de dados, é sempre bom utilizar a extensão 
	para que o consign entenda que não é um diretório */
	.then('app/controllers')
	.into(app);

/* exportar o objeto app */
module.exports = app;