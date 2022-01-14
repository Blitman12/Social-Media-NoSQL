const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'You must enter some text',
            minlength: [1, 'The minimum length is one'],
            maxlength: [280, 'The max number of characters is 280']
        },
        username: {
            type: String,
            required: 'A username is required'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'You must enter some text',
            minlength: [1, 'The minimum length is one'],
            maxlength: [280, 'The max number of characters is 280']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Please enter a username'
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;