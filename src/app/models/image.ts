import mongoose from "mongoose";

const Image = new mongoose.Schema({
  data: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users"
  },
  dataType: {
    type: String,
    required: true
  },
  resolution: {
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  }
}, {
  timestamps: true
})

export default mongoose.model("images", Image)