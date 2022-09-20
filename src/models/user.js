import { Schema,model } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false,
        default: "https://robohash.org/LNN.png?set=set3"
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    organisation: {
        type: [Schema.Types.ObjectId],
        ref: 'organisation'
    },
    events: {
        type: [Schema.Types.ObjectId],
        ref: 'event'
    },
    likes: {
        type: [Schema.Types.ObjectId],
        ref: 'event'
    },
    eventRegisted: {
        type: [Schema.Types.ObjectId],
        ref: 'event'
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'location'
    },
});

const User=model('user',userSchema);

export default User;