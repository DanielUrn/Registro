const express =require('express');
const pool = require('../database');
const router = express.Router();

//DEPARTAMENTOS
//GETS
router.get('/departamento/ingresard', async (req, res)=> {
    const sucursales = await pool.query('SELECT idsucursal,snombre FROM sucursales');
    res.render('inicio/departamento/ingresard', {sucursales});
})

router.get('/departamento/listad', async (req, res) => {

    const lista = await pool.query('SELECT * FROM departamentos ORDER BY depnombre');
    res.render('inicio/departamento/listad', {lista: lista});

});

router.get('/borrar/:iddepartamento', async (req,res) => {
    const { iddepartamento } = req.params;
    await pool.query('DELETE FROM departamentos WHERE iddepartamento=?',[iddepartamento]);
    res.redirect('/inicio/departamento/listad');
});

router.get('/editt/:iddepartamento', async (req,res) =>{
   const { iddepartamento } = req.params;
   const departamento = await pool.query('SELECT * FROM departamentos WHERE iddepartamento=?', [iddepartamento]);
   res.render('inicio/departamento/editd', {departamento:departamento[0]});
});

//POSTS
router.post('/departamento/ingresard', async (req,res)=>{
    
    const { depnombre, sucursal } = req.body;
    const anadir = { 
        depnombre,
        sucursal
    };
    
    await pool.query('INSERT INTO departamentos set ?', [anadir]);
    res.redirect('/inicio/departamento/listad');
})

router.post('/departamento/editt/:iddepartamento', async (req,res) => {
    const { iddepartamento } = req.params;
    const { nombre, cedula, direccion, correo, telefono } = req.body;
    const update = {
        nombre,
        cedula, 
        direccion, 
        correo, 
        telefono
    };
    
    await pool.query('UPDATE departamentos set ? WHERE iddepartamento=?', [update,iddepartamento]);
    res.redirect('/inicio/departamento/listat');
});
//FIN DEPARTAMENTOS

module.exports = router;