const express =require('express');
const pool = require('../database');
const router = express.Router();

const db = require('../database');

//GETS
router.get('/ingresart', (req, res)=> {
    res.render('trabajador/ingresart');
})

router.get('/listat', async (req, res) => {

    const lista = await pool.query('SELECT * FROM empleados ORDER BY nombre');
    res.render('trabajador/listat', {lista: lista});

});

router.get('/borrar/:idempleado', async (req,res) => {
    const { idempleado } = req.params;
    await pool.query('DELETE FROM empleados WHERE idempleado=?',[idempleado]);
    res.redirect('/trabajador/listat');
});

router.get('/editt/:idempleado', async (req,res) =>{
   const { idempleado } = req.params;
   const empleado = await pool.query('SELECT * FROM empleados WHERE idempleado=?', [idempleado]);
   res.render('trabajador/editt', {empleado:empleado[0]});
});

//POSTS
router.post('/ingresart', async (req,res)=>{
    const { nombre, cedula, direccion, correo, telefono } = req.body;
    const anadir = { 
        nombre,
        cedula, 
        direccion, 
        correo, 
        telefono
    };
    
    await pool.query('INSERT INTO empleados set ?', [anadir]);
    
    //Añadir empleado a la lista de promociones/degrados
    const ingreso = await pool.query('SELECT ingreso FROM empleados where cedula=?',[cedula]);
    const fk_idempleado = await pool.query('SELECT idempleado FROM empleados where cedula=?',[cedula]);
    const estado=true;
    const anadirlista = {
        ingreso,
        fk_idempleado,
        estado
    };
    await pool.query('INSERT INTO lista set ?',[anadirlista]);
    res.redirect('/trabajador/listat');
})

router.post('/editt/:idempleado', async (req,res) => {
    const { idempleado } = req.params;
    const { nombre, cedula, direccion, correo, telefono } = req.body;
    const update = {
        nombre,
        cedula, 
        direccion, 
        correo, 
        telefono
    };
    
    await pool.query('UPDATE empleados set ? WHERE idempleado=?', [update,idempleado]);
    res.redirect('/trabajador/listat');
});

module.exports = router;