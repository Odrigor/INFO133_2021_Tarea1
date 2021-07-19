var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const uri='mongodb://localhost:27017/test';
mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true } );
var conn = mongoose.connection;
var path = require('path');
//requiere GridFS
var Grid = require('gridfs-stream');
var fs = require('fs');
var soundPath = path.join(__dirname, './s1.wav');

Grid.mongo = mongoose.mongo;

conn.once('open',function () {
    console.log('** Conexión establecida **');
    var gfs = Grid(conn.db);

    var writestream = gfs.createWriteStream({
        filename: 'sound1.wav'
    });

    fs.createReadStream(soundPath).pipe(writestream);

    writestream.on('close', function(file) {
        console.log(file.filename + '** Escrito en la base de datos **');
    })
})