const router = require('express').Router();
const { getAllThoughts, createAThought, deleteOneThought, getASingleThought, updateAThought, createAReaction, deleteAReaction } = require('../../controllers/thought-controller');


router
    .route('/')
    .get(getAllThoughts)
    .post(createAThought)

router
    .route('/:id')
    .get(getASingleThought)
    .delete(deleteOneThought)
    .put(updateAThought)

router
    .route('/:thoughtId/reactions')
    .post(createAReaction)
    .delete(deleteAReaction)



module.exports = router;