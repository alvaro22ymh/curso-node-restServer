const {Schema, model}= require('mongoose');


const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es requerido']
    },
    correo:{
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'la contrasena es requerida']
    },
    img: {
        type: String
    },
    rol: { 
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

//esta funcion modifica el usuarioSchema enviado al controlador, de modo que solo muestre al body todo en usuario menos __v ni password
UsuarioSchema.methods.toJSON = function(){
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}

module.exports= model('Usuario', UsuarioSchema)