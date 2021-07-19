// requerimos mongoose en nuestro script y abrimos una conexión con nuestra base de datos
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

//verificamos que la conexión se ha establecido
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(' * * * conectado a la base de datos!! * * *');
});

//definimos el esquema de usarui en formato bson
const userSchema = new mongoose.Schema({
    rut: String,
    name: String,
    apellido: String
  });


//deifnimos el esquema de meta en formato bson
const metaSchema = new mongoose.Schema({
    userRut: String,
    upload: { type: Date, default: Date.now },
    apellido: String,
    duration: { type: Number, min: 0, max: 60 },
    soundSource: String,
    category: String,
    posx:String,
    posy:String,
    isInsideSound: Boolean
  });


  //pasamos nuestros esquemas a modelos, para poder usarlos
  const user = mongoose.model('user', userSchema);
  const meta = mongoose.model('meta', metaSchema);


// comenzamos a guardar informacion
const tenet = new user({ 
    rut: '111111111',
    name: 'Pedro',
    apellido: 'Piedra' });

const metatenet = new meta({
    userRut: tenet.rut,
    upload: { type: Date, default: Date.now },
    duration: 0,
    soundSource: 'gimnacio',
    category: 'ambiente',
    posx: 1235,
    posy:-5268,
    isInsideSound: true
  });

console.log(tenet.name);
console.log(metatenet.userRut);
console.log(metatenet.upload);