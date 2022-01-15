const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    getOneUser(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.json({ message: 'There is not a user with this id :(' })
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    createOneUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    updateOneUser({ params, body }, res) {
        User.findByIdAndUpdate(
            params.id,
            body,
            { runValidators: true, new: true })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.json({ message: 'There is not a user with this id :(' })
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    deleteOneUser(req, res) {
        User.findById(req.params.id)
            .then(({ thoughts }) => {
                console.log(thoughts[0])
                thoughts.forEach(thought => {
                    Thought.findByIdAndDelete(thought)
                        .then(thought => {
                            console.log('deleted')
                        }).catch(err => {
                            console.log(err)
                        })
                })
            })
            .then(
                User.findByIdAndDelete(req.params.id)
                    .then(dbUserData => {
                        if (!dbUserData) {
                            return res.json({ message: 'There is not a user with this id :(' })
                        }
                        res.json({ message: 'The user has been DESTROYED!' })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json(err)
                    })
            )
    },
    addFriend(req, res) {
        User.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.json({ message: 'There is not a user with this id :(' })
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    removeFriend(req, res) {
        User.findByIdAndUpdate(
            req.params.id,
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.json({ message: 'There is not a user with this id :(' })
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}


module.exports = userController;