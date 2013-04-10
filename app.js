/**
 * 
 */
var express = require('express')
  , routes = require('./routes')
  , index = require('./routes/index')
  , http = require('http')
  ,mongojs = require('mongojs')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/form', index.form);
app.get('/desc', index.desc);
app.get('/agendas', index.listar);
app.post('/agendas', index.inserir);
app.put('/agendas/:agenda', index.editar);
app.delete('/agendas/:agenda', index.deletar);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

init = function(){
    var DATABASE = 'mongodb://agendajs:agendajs@ds051447.mongolab.com:51447/agendajs';
    if(db == null){
        var databaseUrl = DATABASE;
        var collections = ["agendas"]
        db = mongojs.connect(databaseUrl, collections);
        GLOBAL.db = db;
    }
};
init();