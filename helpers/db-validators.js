const Role = require('../models/role');
const User = require('../models/user');

const roleValidation = async(rol = '') => {

    const rolDb = await Role.findOne({ rol });
    if ( !rolDb  ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const existingEmail = async( email = '' ) => {
    // Verificar si el correo existe en la base de datos 

        const emailDb = await User.findOne({ email });
        if ( emailDb) {
            throw new Error(`El correo: ${ email }, ya está registrado`);
        }
}

const searchUserById = async( id ) => {
    // Verificar si el usuario exite 
    const userDb = await User.findById(id);
    if ( !userDb  ) {
        throw new Error(`El id no existe ${ id }`);
    }
}



module.exports = {
    roleValidation,
    existingEmail,
    searchUserById,
}

