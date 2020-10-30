import mongoose from "mongoose";

export interface SystemInterface extends mongoose.Document {
  defaults: {
    [key: string]: any
  },
  project: {
    name: string,
    uri: string,
  }
}

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