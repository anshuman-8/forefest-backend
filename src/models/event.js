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
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
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
  eventDate: {
    type: Date,
    required: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: "location",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
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
    required: false,
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
});

const Event = model("event", eventSchema);

export default Event;
