import mongoose from "mongoose";

export enum Gender {
  male = "male",
  female = "female"
}

const Schema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
    },
    name: {
      type: String,
      required: true
    },
    hobies: [String],
    gender: {
      type: String,
      enum: [Gender.male, Gender.female]
    },
    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles"
    }],
    bootcampVersion: {
      type: Number,
      required: true,
      default: 2
    },
    status: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model("users", Schema)