const {response} = require('express');
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req, res=response) => {
    const {limite = 5, desde = 0} = req.query; //req.query es el query que viene en url 
    const query = {estado: true} // para solo mostrar los que se encuentre en true



    //Promise.all() ejecuta las funciones await de forma simultanea para evitar el retraso de esperar la resolucion de uno para comenzar con la del otro
    
    //Ya que se promete un array en resp, se puede desestructurar por posicion siendo total=primera posicion, y usuarios=segunda posicion
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
       total,
       usuarios
    });
}

 const usuariosPut = async (req, res=response) => {
    const {id} = req.params;
    //desestrucuta lo que se va a ignorar del resto a excepcion de password que se usa en especifico
    const {_id, password, google, correo, ...resto} = req.body;

    if(password){
        //encripta la contrasena en caso de que se haya mandado a actualizar desde el body
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    //crea el objeto usuario y lo iguala a la acutualizacion hecha a bd de Usuario con cierto id seguido del resto a actualizar
    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        "msg": 'put API - controlador',
        usuario
    });
}
const usuariosPost =  async(req, res=response) => {

    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol})



    //encriptar contrsasena
    const salt = bcryptjs.genSaltSync(); //indica el numero de vueltas que dara a la encriptacion
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en db
    await usuario.save();

    res.status(201).json({
        "msg": 'post API - controlador',
        usuario
    });
}
 const usuariosDelete = async(req, res=response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({
        "msg": 'delete API - controlador',
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}