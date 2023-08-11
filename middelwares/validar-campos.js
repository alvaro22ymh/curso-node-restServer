const { validationResult } = require('express-validator');



//recibe los posibles errores dados por la req desde la route gracias a express validator 
//next() significa que si no hubo error pase al siguente middelware
const validarCampos = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next();
}

module.exports= {
    validarCampos
}