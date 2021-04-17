const express =require('express');
const router = express.Router();
const passport = require('passport');

//GET
router.get('/inicio/login', (req,res) => {
    res.render('inicio/login/login');
});


//POST
router.post('/inicio/login', (req,res) =>{
    passport.authenticate('local.login', {
        successRedirect: '/inicio',
        failureRedirect: '/inicio/login',
        failureFlash:true
    });
    console.log(req.body);
    res.send('OK');

});
module.exports = router;