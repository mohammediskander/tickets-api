import mongoose from "mongoose";

const Notification = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  repeat: {
    type: Boolean,
    default: false
  },
  repeatAfter: Number
}, {
  timestamps: true
})

export default mongoose.model("notifications", Notification)