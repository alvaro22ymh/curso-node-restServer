const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/user');
const { check } = require('express-validator');
const { validarCampos } = require('../middelwares/validar-campos');
const { esRolValido, existeEmail, existeUsuarioId } = require('../helpers/bd-validators');


const router = new Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),//valida que el id enviado sea valido segun mongo
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRolValido),
    validarCampos //valida que no haya errores, en caso de haber se detiene y no sigue a los controladores
], usuariosPut);

//Check es un  middelware valida que el campo sea lo esperado y envia los errores en forma de request a validarCampos
router.post('/',[
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contrasena debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROL','USER_ROL']), mejor abajo

    //Aqui el primer argumento que refiere el custom(), es decir 'rol', va a ser el primer argumento en ser enviado a la funcion esRolValido, por en de no es necesario escribirlo
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),//valida que el id enviado sea valido segun mongo
    check('id').custom(existeUsuarioId),
    validarCampos
], usuariosDelete);

module.exports = router;