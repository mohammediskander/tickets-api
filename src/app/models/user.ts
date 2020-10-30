import mongoose from "mongoose";

export enum Gender {
  male = "male",
  female = "female"
}

export interface UserInterface extends mongoose.Document {
  phoneNumber: string
  email: string
  password: string
  avatar?: mongoose.Schema.Types.ObjectId
  name: string
  hobies?: Array<string>
  roles: [mongoose.Schema.Types.ObjectId]
  gender?: Gender
  bootcampVersion: number
  status: string
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