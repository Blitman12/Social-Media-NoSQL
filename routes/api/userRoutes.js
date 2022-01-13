const router = require('express').Router();
const {
    getAllUsers,
    createOneUser,
    getOneUser,
    updateOneUser,
    deleteOneUser,
    addFriend,
    removeFriend
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

router
    .route('/:id/friends/:friendId')
    .put(addFriend)
    .delete(removeFriend)

module.exports = router;