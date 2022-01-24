const { response } = require('express');


const getUser = (req , res = response)=>{
    const { q, name = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
   
};

const postUser = (req , res = response)=>{
    res.json({msg:'este es el post'})
};

const putUser = (req , res = response)=>{

    const{id } = req.params;
    res.json({msg:'este es el put', id})
};

const patchUser = (req , res = response)=>{
    res.json({msg:'este es el put'})
};

const deleteUser = (req , res = response)=>{
    res.json({msg:'este es el put'})
};

module.exports={
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser,
};