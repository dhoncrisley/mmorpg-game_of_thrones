// importar o mongodb
var mongo = require('mongodb');

/* para evitar que o server faça conexões desnecessárias com o banco, 
é melhor devolver uma variável contendo a função de retorno do banco */
var connMongoDb = function(){
    
    /* ao instanciar um novo banco, é necessário preencher 3 parâmetros */
    var db = new mongo.Db(
        'got',//nome do banco
        new mongo.Server(//instancia do servidor contendo as informações do mesmo
            'localhost',//url
            27017,//porta
            {}//configurações adicionais
        ),
        {}// configurações adicionais
    );
    return db; //retornar o db
}
module.exports = function(){
    //retorna a variável contendo o db, evitando conexões desnecessárias
    return connMongoDb;
}