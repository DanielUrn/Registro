const express = require('express');
const morgan = require('morgan');
const path = require('path');
const hbs = require('express-handlebars');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const mysqlstore = require('express-mysql-session');
const {database} = require('./keys');

//INICIALIZACIONES
const app = express();
require('./lib/passport');

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
app.use(session({
    secret: 'Diosesgrande',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//GLOBALES
app.use((req,res,next) => {
    app.locals.success = req.flash('success');
    next();
})
const pnombre = 'REGISTRO DE EMPLEADOS';


//RUTAS
app.use(require('./routes'));
app.use(require('./routes/auth'));
app.use('/inicio',require('./routes'));



//PUBLICO
app.use(express.static(path.join(__dirname, 'public')));

//INICIAR SERVER
app.listen(app.get('port'), ()=>{
    console.log('SERVIDOR INICIADO EN ', app.get('port'));
});