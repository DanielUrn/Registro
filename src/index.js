const express = require('express');
const morgan = require('morgan');
const path = require('path');
const hbs = require('express-handlebars');

//INICIALIZACIONES
const app = express();

//CONFIGURACIONES
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlebars')

}));
app.set('view engine', '.hbs');


//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//GLOBALES
app.use((require,response,next) => {
    
    next();
})
const pnombre = 'REGISTRO DE EMPLEADOS';

//RUTAS
app.use(require('./routes'));
app.use(require('./routes/auth'));
app.use('/trabajador',require('./routes/trabajador'));


//PUBLICO
app.use(express.static(path.join(__dirname, 'public')));

//INICIAR SERVER
app.listen(app.get('port'), ()=>{
    console.log('SERVIDOR INICIADO EN ', app.get('port'));
});