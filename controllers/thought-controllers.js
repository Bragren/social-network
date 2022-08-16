const { Thought, User } = require('../models')

const thoughtControllers = {
    findAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    findThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thought found has this id.'})
                return
            }
            res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    addThought({body}, res) {
        Thought.create(body)
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No user found has this id.'})
                return
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.status(400).json(err))
    },

    changeThought({params, body},res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thought found has this id'})
                return
            }
            res.status(dbThoughtsData)
        }).catch(err => res.status(400).json(err))
    },

    removeThought({params}, res) {
        Thought.findOneAndRemove({_id: params.thoughtId})
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No thought found has this id'})
            }
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.thoughtId}},
                {new: true}
            )
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found has this id'})
                return
            }
            res.json(dbUserData)
        }).catch(err => res.json(err))
    },

    addReaction({params, body}, res) {
        Thought.updateOne({_id: params.thoughtId},
            {$pull: {reactions: body}}
            ).then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({message: 'No thought found has this id'})
                    return
                }
                res.json(dbThoughtsData)
            }).catch(err => res.status(400).json(err))
    },

    removeReaction({params}, res) {
        Thought.updateOne({_id: params.thoughtId},
            {$pull: {reactions: {_id: params.reactionId}}}
            ).then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({message: 'No thought found has this id'})
                    return
                }
                res.json(dbThoughtsData)
            }).catch(err => res.status(400).json(err))
    }
}

module.exports = thoughtControllers