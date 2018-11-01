var crypto = require('crypto');

function UsuariosDAO(connection) {

    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function (usuario) {
    this._connection.open(function (err, mongoclient) {
        /* open abre a conexão com o banco, solicitando uma função de 
                calback com 2 parâmetros de erro e cliente respectivamente */


        var senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
        usuario.senha = senha_criptografada;
        mongoclient.collection('usuarios', function (err, collection /* Obj de collection */ ) {
            collection.insert(usuario);
            console.log('novo usuário cadastrado')
            mongoclient.close();
        })
    });

}
UsuariosDAO.prototype.autenticar = function (usuario, req, res) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection('usuarios', function (err, collection) {
            var senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
            usuario.senha = senha_criptografada;
            collection.find(usuario).toArray((err, result) => {
                if (result[0] !== undefined) {
                    req.session.autorizado = true;
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;

                }
                if (req.session.autorizado) {
                    res.redirect('jogo');
                } else {

                    res.render('index', {
                        validacao: [{
                            param: 'autenticacao',
                            msg: 'usuário e ou senha inválidos',
                            value: ''
                        }],
                        dadosForm: usuario
                    });
                }
                mongoclient.close();
            });
        })
    });

}

module.exports = function () {
    return UsuariosDAO;
}