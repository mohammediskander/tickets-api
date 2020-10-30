import mongoose from "mongoose";

export interface ImageInterface extends mongoose.Document {
  data: string
  author: mongoose.Schema.Types.ObjectId
  dataType: string
  resolution: {
    height: number
    width: number
  }
}

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