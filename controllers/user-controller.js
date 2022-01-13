const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },
    getOneUser(req, res) {
        User.findOne({ _id: req.params.id })
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
                $set:
                    { username: req.body.username, email: req.body.email },
            },
            { runValidators: true, new: true })
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
                res.json({message: 'User has been deleted'})
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    }
}


module.exports = userController;