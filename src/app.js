const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars')
const path = require('path');
const env = require('node-env-file');
const app = express();

//Inicializaciones
env(path.join(__dirname,'../.env'))
if(process.env.NODE_ENV == "development"){
    app.use(morgan('dev'));
}
app.use(express.static('./src/public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const port = process.env.PORT || 3000;


//Variables de rutas
const indexRoute = require('./routes/index');
const notesRoute = require('./routes/notes');
const contactsRoute = require('./routes/contacts');
const usersRoute = require('./routes/users');

//Motor de plantillas
app.set('views', path.join(__dirname, './views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main.hbs',
    LayoutsDir: path.join(__dirname, './layouts'),
    PartialsDir: path.join(__dirname, './partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//Rutas
app.use('/', indexRoute);
app.use('/notes', notesRoute);
app.use('/contacts', contactsRoute);
//app.use('/users', usersRoute);

//Iniciando servidor
app.listen(port,()=> console.log('Server on port ' + port));