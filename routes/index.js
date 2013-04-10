db = GLOBAL.db;
mongojs = require('mongojs');

exports.index = function(req, res) {
    res.render('index');
};

exports.form = function(req, res) {
    res.render('form');
};

exports.desc = function(req, res) {
    res.render('desc');
};

exports.listar = function(req, res) {
    db.agendas.find(function(err, doc) {
        if (err) {
            throw err;
        } else {
            console.log(doc);
            res.send(doc);
        }
    });
};
exports.inserir = function(req, res) {
    var Agenda = req.body.agenda;
    console.log(Agenda);
    db.agendas.save(Agenda, function(err, doc) {
        if (err) {
            throw err;
        } else {
            console.log(doc);
//            socket.broadcast.emit('updateagenda', Contato);
//            io.sockets.emit('updateagenda', Contato);
            res.send(Agenda);
        }
    });
};

exports.editar = function(req, res) {
    console.log(req);
    var Agenda = req.body.agenda;
    console.log(Agenda);
    var _id = Agenda._id;
    delete Agenda._id;
    console.log(mongojs.ObjectId(_id));
    db.agendas.update({
        _id: mongojs.ObjectId(_id)
    }, {
        $set: Agenda
    }, function(err, doc) {
        res.send();
    });
};

exports.deletar = function(req, res) {
    var id = req.params.agenda;
    db.agendas.remove({
        _id: mongojs.ObjectId(id)
    }, function(err, doc) {
        res.send();
    });
};