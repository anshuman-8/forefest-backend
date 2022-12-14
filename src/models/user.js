import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  isOrg: {
    type: Boolean,
    required: false,
    default: false,
  },
  avatar: {
    type: String,
    required: false,
    default: "https://robohash.org/LNN.png?set=set3",
  },
  age: {
    type: Number,
    required: false,
    default: null,
  },
  gender: {
    type: String,
    required: false,
    default: null,
  },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    }
  ],
    bio: {
    type: String,
    required: false,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
    default: null,
  },
  organisation: [{
    type: Schema.Types.ObjectId,
    ref: "organisation",
    default: null,
  }],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "event",
      default: null,
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "event",
      default: null,
    },
  ],
  eventRegisted: [
    {
      type: Schema.Types.ObjectId,
      ref: "event",
      default: null,
    },
  ],
  location: {
    // type: Schema.Types.ObjectId,
    // ref: "location",
    type: String,
    required: false,
    default: null,
  },
});

const User = model("user", userSchema);

export default User;
