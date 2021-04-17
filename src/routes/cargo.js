const express =require('express');
const router = express.Router();
const pool = require('../database');

//CARGOS
//GETS

router.get('/cargo/listac', async (req, res) => {

    const lista = await pool.query('SELECT * FROM cargos ORDER BY idcargo');
    res.render('inicio/cargo/listac', {lista: lista});

});
module.exports = router;

//FIN CARGOS