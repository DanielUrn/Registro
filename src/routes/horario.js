const express =require('express');
const router = express.Router();
const pool = require('../database');

//HORARIOS
//GETS

router.get('/horario/listah', async (req, res) => {

    const lista = await pool.query('SELECT * FROM horarios ORDER BY idhorario');
    res.render('inicio/horario/listah', {lista: lista});

});
module.exports = router;