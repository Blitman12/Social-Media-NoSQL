const { Schema, model } = require('mongoose');
const Thought = require('./Thought')


const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: 'A username is required',
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: 'An email is required',
            unique: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);



UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = model('User', UserSchema);
module.exports = User;