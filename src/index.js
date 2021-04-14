const express = require('express');
const morgan = require('morgan');
//INICIALIZACIONES
const app = express();

//CONFIGURACIONES
app.set('port', process.env.PORT || 4000);

//MIDDLEWARES
app.use(morgan('dev'));

//GLOBALES
const pnombre = 'REGISTRO DE EMPLEADOS';

//RUTAS


//ABIERTO

//INICIAR SERVER
app.listen(app.get('port', ()=>{
    console.log('SERVIDOR INICIADO EN ', app.get('port'));
}))