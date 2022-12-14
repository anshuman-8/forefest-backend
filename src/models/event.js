import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  dateTime: {
    type: Date,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
  images: {
    type: [String],
    required: false,
  },
  active: {
    type: Boolean,
    required: false,
    default: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  organisation: {
    type: Schema.Types.ObjectId,
    ref: "organisation",
  },
  // eventDate: {
  //   type: Date,
  //   required: false,
  // },
  location: {
    // type: Schema.Types.ObjectId,
    // ref: "location",
    type: String,
    required: false,
  },
  category: {
    // type: Schema.Types.ObjectId,
    type: String,
    // enum : ['','virtual'],
    // default: 'user'
    required: false,
    // ref: "category",
  },
  registrations: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  twitter: {
    type: String,
    required: false,
  },
  facebook: {
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
  rating: {
    type: Number,
    required: false,
  },
  registrationLimit: {
    type: Number,
    required: true,
  },
  sponsor: {
    // type: Schema.Types.ObjectId,
    // ref: 'sponsor'
    type: [String],
    required: false,
  },
  refundPolicy: {
    type: String,
    required: false,
  },
  termsAndConditions: {
    type: String,
    required: false,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

const Event = model("event", eventSchema);

export default Event;
