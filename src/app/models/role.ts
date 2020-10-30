import mongoose from "mongoose";

const Role = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  privileges: [
    {
      model: {
        type: String,
        required: true
      },
      accessRights: {
        create: {
          type: Boolean,
          required: true,
          default: false
        },
        fetch: {
          type: Boolean,
          required: true,
          default: false
        },
        gets: {
          type: Boolean,
          required: true,
          default: false,
        },
        patch: {
          type: Boolean,
          required: true,
          default: false
        }
      }
    }
  ]

},
{
  timestamps: true
})

export default mongoose.model("roles", Role)