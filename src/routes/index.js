const express =require('express');
const router = express.Router();

router.get('/', (require,response)=>{
    response.send('HOLA MUNDO');
})

module.exports = router;