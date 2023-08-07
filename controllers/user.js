const {response} = require('express');



const usuariosGet = (req, res=response) => {
    const query = req.query;
    const {edad, name } = query;
    res.json({
        "msg": 'get API - controlador',
        edad,
        name
    });
}
 const usuariosPut = (req, res=response) => {
    const id = req.params.id;
    res.json({
        "msg": 'put API - controlador',
        id
    });
}
const usuariosPost =  (req, res=response) => {

    const body = req.body;

    res.status(201).json({
        "msg": 'post API - controlador',
        body
    });
}
 const usuariosDelete = (req, res=response) => {
    res.json({
        "msg": 'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}