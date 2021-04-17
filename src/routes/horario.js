const express =require('express');
const router = express.Router();
const pool = require('../database');

const db = require('../database');

//SEDES
//GETS
router.get('/horario/ingresarh', (req, res)=> {
    res.render('inicio/horario/ingresarh');
})

router.get('/horario/listah', async (req, res) => {

    const lista = await pool.query('SELECT * FROM horarios ORDER BY idhorario');
    res.render('inicio/horario/listah', {lista: lista});

});

router.get('/horario/borrar/:idhorario', async (req,res) => {
    const { idhorario } = req.params;
    await pool.query('DELETE FROM horarios WHERE idhorario=?',[idhorario]);
    res.redirect('/inicio/horario/listah');
});

router.get('/horario/edith/:idhorario', async (req,res) =>{
   const { idhorario } = req.params;
   const horario = await pool.query('SELECT * FROM horarios WHERE idhorario=?', [idhorario]);
   res.render('inicio/sede/edits', {horario:horario[0]});
});

//POSTS
router.post('/horario/ingresarh', async (req,res)=>{
    const { idhorario, direccion } = req.body;
    const anadir = { 
        idhorario, 
        direccion
    };   
    await pool.query('INSERT INTO horarios set ?', [anadir]);
    res.redirect('/inicio/horario/listah');
})

router.post('/sede/edits/:idhorario', async (req,res) => {
    const { idhorario } = req.params;
    const { idhorario, direccion } = req.body;
    const update = {
        idhorario,
        direccion 
    };
    
    await pool.query('UPDATE horarios set ? WHERE idhorario=?', [update,idhorario]);
    res.redirect('/inicio/horario/listah');
});

module.exports = router;