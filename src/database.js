const mysql = require('mysql');
const {promisify} = require('util');

const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((error, conexion) => {
    if (error){
        if(error.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONEXION CON LA BASE DE DATOS SE CERRÓ')
        }
        if(error.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA CONEXION CON LA BASE DE DATOS TIENE MUCHAS CONEXIONES')
        }
        if(error.code === 'ECONNREFUSED'){
            console.error('LA CONEXION CON LA BASE DE DATOS FUE RECHAZADA')
        }
    }

    if(conexion){
        conexion.release();
        console.log('LA BASE DE DATOS FUE CONECTADA');
        return;
    }
});

pool.query = promisify(pool.query);

module.exports = pool;