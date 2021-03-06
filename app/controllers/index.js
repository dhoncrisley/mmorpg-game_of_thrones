module.exports.index = function (application, req, res) {
    res.render('index', {
        validacao: {},
        dadosForm: {}
    });
}
module.exports.autenticar = function (application, req, res) {
    var dadosForm = req.body;
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        console.log(erros)
        res.render('index', {
            validacao: erros,
            dadosForm: dadosForm
        });
        return;
    }
    var connection = application.config.dbConnection;

    var usuariosDao = new application.app.models.UsuariosDAO(connection);
    usuariosDao.autenticar(dadosForm, req, res);
    //res.send('ok para a sessão');
}