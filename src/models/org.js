import { Schema, model } from "mongoose";

const orgSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "event",
    },
  ],
  location: [
    {
      type: Schema.Types.ObjectId,
      ref: "location",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "review",
    },
  ],
  rating: {
    type: Number,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  youtube: {
    type: String,
    required: false,
  },
});

    const Org = model("org", orgSchema);
    
    export default Org;