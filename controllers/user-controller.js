const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate('thoughts')
            .populate('friends')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },
    getOneUser(req, res) {
        User.findOne({ _id: req.params.id })
            .populate('thoughts')
            .populate('friends')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'There is not a user with this id :(' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },
    createOneUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },
    updateOneUser(req, res) {
        User.findByIdAndUpdate(
            req.params.id,
            {
                $set: { username: req.body.username, email: req.body.email },
            },
            { runValidators: true, new: true })
            .populate('thoughts')
            .populate('friends')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'There is not a user with this id :(' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },
    deleteOneUser(req, res) {
        User.findByIdAndDelete(req.params.id)
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'There is not a user with this id :(' })
                    return
                }
                res.json({ message: 'The user has been DESTROYED!' })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },
    addFriend(req, res) {
        User.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .populate('thoughts')
            .populate('friends')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'There is not a user with this id :(' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },
    removeFriend(req, res) {
        User.findByIdAndUpdate(
            req.params.id,
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .populate('thoughts')
            .populate('friends')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'There is not a user with this id :(' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    }
}


module.exports = userController;