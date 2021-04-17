const express =require('express');
const pool = require('../database');
const router = express.Router();

//TRABAJADORES
//GETS
router.get('/ingresart', (req, res)=> {
    res.render('inicio/trabajador/ingresart');
})

router.get('/listat', async (req, res) => {

    const lista = await pool.query('SELECT * FROM empleados ORDER BY nombre');
    res.render('inicio/trabajador/listat', {lista: lista});

});

router.get('/borrar/:idempleado', async (req,res) => {
    const { idempleado } = req.params;
    await pool.query('DELETE FROM empleados WHERE idempleado=?',[idempleado]);
    res.redirect('/inicio/trabajador/listat');
});

router.get('/editt/:idempleado', async (req,res) =>{
   const { idempleado } = req.params;
   const empleado = await pool.query('SELECT * FROM empleados WHERE idempleado=?', [idempleado]);
   res.render('inicio/trabajador/editt', {empleado:empleado[0]});
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
    res.redirect('/inicio/trabajador/listat');
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
    res.redirect('/inicio/trabajador/listat');
});
//FIN TRABAJADORES

module.exports = router;