const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});


const Rol =  mongoose.model( 'Role', RoleSchema );

module.exports = Rol;
