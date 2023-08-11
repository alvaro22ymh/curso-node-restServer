const role= require('../models/rol')
const Usuario = require('../models/user')

const esRolValido = async(rol='') => {
    const existeRol = await role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la BD`)
    }
}


const existeEmail = async(correo='') => {
    const existe = await Usuario.findOne({correo});
    if(existe){
        throw new Error(`Correo ${correo} ya existe`)
    }
}
const existeUsuarioId = async(id) => {
    const existe = await Usuario.findById(id);
    if(!existe){
        throw new Error(`El usuario con el id ${id} no existe`)
    }
}


module.exports={
    esRolValido,
    existeEmail,
    existeUsuarioId
}