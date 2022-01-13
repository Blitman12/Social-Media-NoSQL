const router = require('express').Router();
const {
    getAllUsers,
    createOneUser,
    getOneUser,
    updateOneUser,
    deleteOneUser
} = require('../../controllers/user-controller')

router
    .route('/')
    .get(getAllUsers)
    .post(createOneUser)

router
    .route('/:id')
    .get(getOneUser)
    .put(updateOneUser)
    .delete(deleteOneUser)

module.exports = router;