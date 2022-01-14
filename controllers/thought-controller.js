const { Thought, User } = require('../models')

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    getASingleThought(req, res) {
        Thought.findById(req.params.id)
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.json({ message: 'No user found' })
                    return
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    updateAThought({ params, body }, res) {
        Thought.findByIdAndUpdate(
            params.id,
            body,
            { new: true, runValidators: true }
        )
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.json({ message: `There is no thought with the ID of ${req.params.id}` })
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    createAThought(req, res) {
        Thought.create(req.body)
            .then(dbThoughtData => {
                User.findByIdAndUpdate(
                    req.body.userId,
                    { $push: { thoughts: dbThoughtData } },
                    { runValidators: true, new: true }
                )
                    .select('-__v')
                    .then(data => {
                        if (!data) {
                            return res.json({ message: 'No user found' })
                        }
                        res.json(data)
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    deleteOneThought(req, res) {
        Thought.findByIdAndDelete(req.params.id)
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.json({ message: `There is no thought with the id of: ${req.params.id}` })
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    createAReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.json({ message: `There is no thought with the id of: ${req.params.id}` })
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    deleteAReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: {reactionId: req.body.reactionId} }}
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.json({ message: `There is no thought with the id of: ${req.params.id}` })
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}



module.exports = thoughtController
