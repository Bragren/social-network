const router = require('express').Router()

const {
    findAllUsers, findUserById, createUser, changeUser, removeUser, removeFriend, addFriend
} = require('../../controllers/user-controllers')

router.route('/')
    .get(findAllUsers)
    .post(createUser)

router.route('/:id')
    .get(findUserById)
    .put(changeUser)
    .delete(removeUser)

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router