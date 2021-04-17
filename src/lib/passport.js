const passport = require('passport');
const strategy = require('passport-local').Strategy;

passport.use('local.login', new strategy({
    usernameField:'usuario',
    passwordField:'contrasena',
    passReqToCallback: true
}, async (req,usuario,contrasena,hecho) => {

    console.log(req.body);

}));

//passport.serializeUser((usuario,hecho)=>{

//});