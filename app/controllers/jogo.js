module.exports.jogo = function (application, req, res) {

    if (req.session.autorizado !== true) {
        res.render('index', {
            validacao: {},
            dadosForm: {}
        })
        return;

    }
    var msg = ''

    if (req.query.msg !== '') {
        msg = req.query.msg;
    }

    var usuario = req.session.usuario
    var casa = req.session.casa

    var connection = application.config.dbConnection;
    var jogoDao = new application.app.models.JogoDAO(connection);
    jogoDao.iniciarJogo(res, usuario, casa, msg);
}
module.exports.sair = function (application, req, res) {

    req.session.destroy(function (err) {
        res.render('index', {
            validacao: {},
            dadosForm: {}
        })
    });

}
module.exports.suditos = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Faça login na sessão!');
        return;

    }
    res.render('aldeoes', {
        validacao: {}
    })


}
module.exports.pergaminhos = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Faça login na sessão!');
        return;

    }

    var connection = application.config.dbConnection;
    var jogoDao = new application.app.models.JogoDAO(connection);
    var usuario = req.session.usuario;
    jogoDao.getAcoes(usuario, res);
    
}
module.exports.ordenar_acao_suditos = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Faça login na sessão!');
        return;

    }
    var dadosForm = req.body;
    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();
    if (erros) {
        res.redirect('jogo?msg=A');
        return;
    }
    var connection = application.config.dbConnection;
    var jogoDao = new application.app.models.JogoDAO(connection);
    dadosForm.usuario = req.session.usuario;
    jogoDao.acao(dadosForm);
    res.redirect('jogo?msg=B');

}
module.exports.revogar_acao = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Faça login na sessão!');
        return;

    }
    var url_query = req.query;
    //console.log(url_query);

    var connection = application.config.dbConnection;
    var jogoDao = new application.app.models.JogoDAO(connection);

    var _id = url_query.id_acao;
    jogoDao.revogarAcao(_id, res);
    
    

}