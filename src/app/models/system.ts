import mongoose from "mongoose";

const System = new mongoose.Schema({
  defaults: {
    type: Object,
  },
  project: {
    name: {
      type: String,
      required: true,
    },
    uri: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
}, {
  timestamps: true
})

export default mongoose.model("system", System)