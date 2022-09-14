const router = require('express').Router()

const {findAllThoughts, findThoughtById, addThought, changeThought, removeThought, addReaction, removeReaction}
 = require('../../controllers/thought-controllers')

router.route('/')
    .get(findAllThoughts)
    .post(addThought)

router.route('/:id')
    .get(findThoughtById)
    .put(changeThought)

router.route('/:thoughtId/:userId')
    .delete(removeThought)

router.route('/:thoughtId/reactions')
    .post(addReaction)

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router