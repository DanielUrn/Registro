const express =require('express');
const router = express.Router();
const pool = require('../database');

const db = require('../database');

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

module.exports = router;