import mongoose from "mongoose";

export interface NotificationInterface extends mongoose.Document {
  title: string
  body: string
  date: Date
  repeat: boolean | false
  repeatAfter: number
}

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