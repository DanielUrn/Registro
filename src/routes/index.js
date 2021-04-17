const express =require('express');
const router = express.Router();
const pool = require('../database');

const db = require('../database');

router.get('/', (req,res)=>{
    res.render('inicio/inicio');
})

//TRABAJADORES


//GETS
router.get('/trabajador/ingresart', (req, res)=> {
    res.render('inicio/trabajador/ingresart');
})

router.get('/trabajador/listat', async (req, res) => {

    const lista = await pool.query('SELECT * FROM empleados ORDER BY nombre');
    res.render('inicio/trabajador/listat', {lista: lista});

});

router.get('/trabajador/borrar/:idempleado', async (req,res) => {
    const { idempleado } = req.params;
    await pool.query('DELETE FROM empleados WHERE idempleado=?',[idempleado]);
    res.redirect('/inicio/trabajador/listat');
});

router.get('/trabajador/editt/:idempleado', async (req,res) =>{
   const { idempleado } = req.params;
   const empleado = await pool.query('SELECT * FROM empleados WHERE idempleado=?', [idempleado]);
   res.render('inicio/trabajador/editt', {empleado:empleado[0]});
});



//POSTS
router.post('/trabajador/ingresart', async (req,res)=>{
    const { nombre, cedula, direccion, correo, telefono } = req.body;
    const anadir = { 
        nombre,
        cedula, 
        direccion, 
        correo, 
        telefono
    };
    await pool.query('INSERT INTO empleados set ?', [anadir]);
    req.flash('success', 'Trabajador añadido');
    
    //Añadir empleado a la lista de promociones/degrados
    const ingreso = await pool.query('SELECT ingreso FROM empleados WHERE cedula=?',[cedula]);
    const estado=true;

    const anadirlista = {
        ingreso: ingreso[0].ingreso,
        fk_idempleado:cedula,
        estado
    };
    console.log(anadirlista);
    await pool.query('INSERT INTO lista set ?',[anadirlista]);
    res.redirect('/inicio/trabajador/listat');
})

router.post('/trabajador/editt/:idempleado', async (req,res) => {
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
    req.flash('success', 'Trabajador editado');
    res.redirect('/inicio/trabajador/listat');
});



//FIN TRABAJADORES

//SEDES
//GETS
router.get('/sede/ingresars', (req, res)=> {
    res.render('inicio/sede/ingresars');
})

router.get('/sede/listas', async (req, res) => {

    const lista = await pool.query('SELECT * FROM sucursales ORDER BY snombre');
    res.render('inicio/sede/listas', {lista: lista});

});

router.get('/sede/borrar/:idsucursal', async (req,res) => {
    const { idsucursal } = req.params;
    await pool.query('DELETE FROM sucursales WHERE idsucursal=?',[idsucursal]);
    res.redirect('/inicio/sede/listas');
});

router.get('/sede/edits/:idsucursal', async (req,res) =>{
   const { idsucursal } = req.params;
   const sucursal = await pool.query('SELECT * FROM sucursales WHERE idsucursal=?', [idsucursal]);
   res.render('inicio/sede/edits', {sucursal:sucursal[0]});
});

//POSTS
router.post('/sede/ingresars', async (req,res)=>{
    const { snombre, direccion } = req.body;
    const anadir = { 
        snombre, 
        direccion
    };   
    await pool.query('INSERT INTO sucursales set ?', [anadir]);
    res.redirect('/inicio/sede/listas');
})

router.post('/sede/edits/:idsucursal', async (req,res) => {
    const { idsucursal } = req.params;
    const { snombre, direccion } = req.body;
    const update = {
        snombre,
        direccion 
    };
    
    await pool.query('UPDATE sucursales set ? WHERE idsucursal=?', [update,idsucursal]);
    res.redirect('/inicio/sede/listas');
});
//FIN SEDES

module.exports = router;