require('dotenv').config()
const express = require('express')
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath='/api/usuarios';

        //middelwares
        this.middelwares();
        //rutas de mi app
        this.routes();
    }

    middelwares(){
        //directorio publico
        this.app.use(express.static('public'))

        //Lectura y parseo del body
        this.app.use(express.json());

        //CORS
        this.app.use(cors());
    }

    routes() {        
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port)
        }) 
    }

}

module.exports = Server;