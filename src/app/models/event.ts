import mongoose from "mongoose";

const Event = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories"
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users"
  }
},
{
  timestamps: true
});

export default mongoose.model("events", Event);