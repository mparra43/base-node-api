const { Router } = require('express')

const { check } = require('express-validator');
const { roleValidation, existingEmail, searchUserById, } = require('../helpers/db-validators');
const {validateFields} = require('../middlewares/validateFileds');

const { getUsers,
    postUser,
    putUser,
    patchUser,
    deleteUser } = require('../controller/user')

const router = Router();

router.get('/', getUsers);
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email', ).custom(  existingEmail ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( roleValidation),
    validateFields
], postUser);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( searchUserById ),
    check('rol').custom( roleValidation ),
        validateFields,
    ], putUser);


router.patch('/', patchUser);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existingEmail ),
    validateFields,
], deleteUser);

module.exports = router;