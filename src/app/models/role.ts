import mongoose from "mongoose";

export interface AccessRightInterface {
  create: boolean;
  fetch: boolean;
  gets: boolean;
  patch: boolean;
  delete: boolean;
}

export interface PriviligesInterface {
  model: string;
  accessRights: AccessRightInterface;
}

export interface RoleInterface {
  name: string;
  privileges: [PriviligesInterface];
}

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