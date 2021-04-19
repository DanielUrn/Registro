const express =require('express');
const router = express.Router();
const pool = require('../database');

const db = require('../database');

router.get('/', (req,res)=>{
    res.render('inicio/inicio');
})

//TRABAJADORES


//GETS
router.get('/trabajador/ingresart', async (req, res)=> {
    const cargo = await pool.query('SELECT idcargo,cnombre,depnombre FROM cargos INNER JOIN departamentos ON cargos.departamento=departamentos.iddepartamento');
    res.render('inicio/trabajador/ingresart',{cargo});
})

router.get('/trabajador/listat', async (req, res) => {

    const lista = await pool.query('SELECT idempleado,nombre,cedula,direccion,correo,telefono,cnombre FROM empleados INNER JOIN cargos ON empleados.cargo = cargos.idcargo ORDER BY nombre');
    res.render('inicio/trabajador/listat', {lista: lista});

});

router.get('/trabajador/borrar/:idempleado', async (req,res) => {
    const { idempleado } = req.params;
    await pool.query('DELETE FROM empleados WHERE idempleado=?',[idempleado]);
    res.redirect('/inicio/trabajador/listat');
});

router.get('/trabajador/editt/:idempleado', async (req,res) =>{
   const { idempleado } = req.params;
   const empleado = await pool.query('SELECT idempleado,nombre,cedula,direccion,correo,telefono,cnombre,idcargo FROM empleados INNER JOIN cargos ON empleados.cargo=cargos.idcargo WHERE idempleado=?', [idempleado]);
   const cargos = await pool.query('SELECT idcargo,cnombre,depnombre FROM cargos INNER JOIN departamentos ON cargos.departamento=departamentos.iddepartamento');
   res.render('inicio/trabajador/editt', {empleado:empleado[0],cargos});
});

//POSTS
router.post('/trabajador/ingresart', async (req,res)=>{
    const { nombre, cedula, direccion, correo, telefono, cargo } = req.body;
    const anadir = { 
        nombre,
        cedula, 
        direccion, 
        correo, 
        telefono,
        cargo
    };
    
    await pool.query('INSERT INTO empleados set ?', [anadir]);
    res.redirect('/inicio/trabajador/listat');
})

router.post('/trabajador/editt/:idempleado', async (req,res) => {
    const { idempleado } = req.params;
    const { nombre, cedula, direccion, correo, telefono,cargo } = req.body;
    const update = {
        nombre,
        cedula, 
        direccion, 
        correo, 
        telefono,
        cargo
    };
    pool.query('SET FOREIGN_KEY_CHECKS=0');
    pool.query('UPDATE empleados set ? WHERE idempleado=?', [update,idempleado]);
    res.redirect('/inicio/trabajador/listat');
});
//FIN TRABAJADORES





//SEDES
//GETS
router.get('/sede/ingresars', (req, res)=> {
    res.render('inicio/sede/ingresars');
})

router.get('/sede/listas', async (req, res) => {

    const lista = await pool.query('SELECT idsucursal,snombre, sucursales.direccion, COUNT(empleados.cargo) AS nempleados, COUNT(departamentos.iddepartamento) AS ndep  FROM sucursales INNER JOIN departamentos ON sucursales.idsucursal=departamentos.sucursal INNER JOIN cargos ON departamentos.iddepartamento = cargos.departamento INNER JOIN empleados ON cargos.idcargo = empleados.cargo GROUP BY snombre');
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



//HORARIOS
//GETS

router.get('/horario/listah', async (req, res) => {

    const lista = await pool.query('SELECT * FROM horarios ORDER BY idhorario');
    res.render('inicio/horario/listah', {lista: lista});

});
module.exports = router;

//FIN HORARIOS

//CARGOS
//GETS

router.get('/cargo/ingresarc', async (req, res)=> {
    const horario = await pool.query('SELECT idhorario,fentrada,fsalida FROM horarios ORDER BY fentrada');
    const departamento = await pool.query('SELECT iddepartamento, depnombre FROM departamentos ORDER BY depnombre');
    res.render('inicio/cargo/ingresarc', {horario: horario,departamento});
})


router.get('/cargo/listac', async (req, res) => {

    const lista = await pool.query('SELECT idcargo,cnombre, depnombre,fentrada,fsalida, COUNT(empleados.cargo) AS nempleados FROM cargos INNER JOIN horarios ON cargos.horario = horarios.idhorario INNER JOIN departamentos ON cargos.departamento = departamentos.iddepartamento INNER JOIN empleados ON empleados.cargo=cargos.idcargo GROUP BY cnombre');
    console.log(lista);
    res.render('inicio/cargo/listac', {lista: lista});

});

router.get('/cargo/borrar/:idcargo', async (req,res) => {
    const { idcargo } = req.params;
    pool.query('SET FOREIGN_KEY_CHECKS=0');
    await pool.query('DELETE FROM cargos WHERE idcargo=?',[idcargo]);
    pool.query('DELETE FROM empleados WHERE cargo=?',[idcargo]);
    await pool.query('SET FOREIGN_KEY_CHECKS=1');
    res.redirect('/inicio/cargo/listac');
});

router.get('/cargo/editc/:idcargo', async (req,res) =>{
   const { idcargo } = req.params;
   const cargo = await pool.query('SELECT idcargo,cnombre,idhorario,fentrada,fsalida,iddepartamento,depnombre FROM cargos INNER JOIN horarios ON cargos.horario = horarios.idhorario INNER JOIN departamentos ON cargos.departamento = departamentos.iddepartamento WHERE idcargo=?', [idcargo]);
   const horario = await pool.query('SELECT idhorario,fentrada,fsalida FROM horarios ORDER BY fentrada');
    const departamento = await pool.query('SELECT iddepartamento, depnombre FROM departamentos ORDER BY depnombre');
   res.render('inicio/cargo/editc', {cargo:cargo[0], horario,departamento});
});


//POSTS
router.post('/cargo/editc/:idcargo', async (req,res) => {
    const { idcargo } = req.params;
    const { cnombre } = req.body;
    const update = {
        cnombre
    };
    
    await pool.query('UPDATE cargos set ? WHERE idcargo=?', [update,idcargo]);
    res.redirect('/inicio/cargo/listac');
});

router.post('/cargo/ingresarc', async (req,res)=>{
    const { cnombre, horario, departamento } = req.body;
    const anadir = { 
        cnombre,
        horario, 
        departamento
    };
    await pool.query('INSERT INTO cargos set ?', [anadir]);
    res.redirect('/inicio/cargo/listac');
})

//FIN CARGOS


//DEPARTAMENTOS
//GETS
router.get('/departamento/ingresard', async (req, res)=> {
    const sucursales = await pool.query('SELECT idsucursal,snombre FROM sucursales');
    res.render('inicio/departamento/ingresard', {sucursales});
})

router.get('/departamento/listad', async (req, res) => {

    const lista = await pool.query('SELECT iddepartamento,depnombre,snombre,COUNT(empleados.cargo) AS nempleados FROM departamentos INNER JOIN cargos ON cargos.departamento = departamentos.iddepartamento INNER JOIN empleados ON empleados.cargo=cargos.idcargo INNER JOIN sucursales ON departamentos.sucursal = sucursales.idsucursal GROUP BY depnombre');
    console.log(lista);
    res.render('inicio/departamento/listad', {lista: lista});

});

router.get('/borrar/:iddepartamento', async (req,res) => {
    const { iddepartamento } = req.params;
    await pool.query('DELETE FROM departamentos WHERE iddepartamento=?',[iddepartamento]);
    res.redirect('/inicio/departamento/listad');
});

router.get('/departamento/editd/:iddepartamento', async (req,res) =>{
   const { iddepartamento } = req.params;
   const departamento = await pool.query('SELECT * FROM departamentos WHERE iddepartamento=?', [iddepartamento]);
   const sucursal = await pool.query('SELECT snombre, idsucursal FROM sucursales');
   res.render('inicio/departamento/editd', {departamento:departamento[0],sucursal});
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