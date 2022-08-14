const { User } = require('../models')

const userControllers = {
    findAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    findUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id.'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },

    changeUser({ params, body }, res) {
        User.findByIdAndUpdate({ _id: params.id}, body, {new: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({message: 'No User has that id.'})
                return
            }
            res.json(dbUserData)
        }).catch(err => res.status(400).json(err))
    },

    removeUser({params}, res) {
        User.findByIdAndDelete({_id: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({message: 'No user has that id'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    },

    addFriend({params}, res) {
        User.updateOne({_id: params.userId},
            {$push: {friends: params.friendId}}
            ).then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user has that id'})
                    return
                }
                res.json(dbUserData)
            }).catch(err => res.status(400).json(err))
    },

    removeFriend({params}, res) {
        User.updateOne({_id: params.userId},
            {$pull: {friends: params.friendId}}
            ).then(dbUserData => {
                if (!dbUserData) {
                    res.status(400).json({message: 'No user has that id'})
                    return
                } 
                res.json(dbUserData)
            }).catch(err => res.status(400).json(err))
    }

}

module.exports = userControllers;