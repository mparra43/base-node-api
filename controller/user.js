const { response, re } = require('express');
const bcryptjs = require('bcryptjs');
const  User  = require('../models/user');
const { roleValidation, existingEmail, searchUserById, } = require('../helpers/db-validators');


const getUsers= async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number( from ) )
            .limit(Number( limit ))
    ]);

    res.json({
        total,
        users
    });
};

const postUser = async (req, res = response) => {

    const { name, email, password, rol } = req.body;

        const userDb = new User({ name, email, password, rol });

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        userDb.password = bcryptjs.hashSync( password, salt );

        // Guardar en BD
        await userDb.save();

        res.status(200).json({
            userDb
        });
};


const putUser = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );
    const userUpdate = await User.findById(id);
    res.status(200).json({
        msg:"el usuario fue actualizado",
        userUpdate
    });
};

const patchUser = (req, res = response) => {
    res.json({ msg: 'este es el put' })
};

const deleteUser = async(req, res = response) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { state: false } );


    res.status(200).json(user);
};

module.exports = {
    getUsers,
    postUser,
    putUser,
    patchUser,
    deleteUser,
};