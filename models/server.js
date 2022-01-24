
const express = require('express');
const cors = require('cors')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.pathUser = '/api/user';
        this,this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use( express.json());
    }

    routes(){
         this.app.use(this.pathUser, require('../routes/user'));
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}


module.exports = Server;