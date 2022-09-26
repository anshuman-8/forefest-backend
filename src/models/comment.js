import {Schema, model} from 'mongoose';

const locationSchema = new Schema({
    text:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    event:{
        type: Schema.Types.ObjectId,
        ref: 'event'
    }
});

const Comment = model('comment', locationSchema);

export default Comment;