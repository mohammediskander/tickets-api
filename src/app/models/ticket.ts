import mongoose from "mongoose";

export enum TicketStatus {
  open = "open",
  accepted = "accepted",
  rejected = "rejected",
  delivered = "delivered",
  expired = "expired"
}

export type LicencePlate = {
  letters?: string,
  digits: string
}

export type Car = {
  model?: string,
  licencePlate?: LicencePlate,
  color?: string
}

export type Driver = {
  name?: string,
  car: Car
}

export type Details = {
  type: Type,
  expectedDeliveryDate: Date,
  driver: Driver,
}

export enum Type {
  food = "food",
  supermarket = "supermarket",
  gift = "gift",
  personalProduct = "personalProduct",
  other = "other"
}

export interface TicketInterface extends mongoose.Document {
  name: string,
  user: mongoose.Schema.Types.ObjectId,
  description?: string,
  details: Details,
  status: TicketStatus,
}

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types
  },
  description: String,
  details: {
    type: {
      type: String,
      required: true,
      enum: [
        Type.food,
        Type.gift,
        Type.other,
        Type.personalProduct,
        Type.supermarket
      ]
    },
    expectedDeliveryDate: {
      type: Date,
      required: true
    },
    driver: {
      name: String,
      car: {
        model: String,
        licencePlate: {
          letters: String,
          digits: {
            type: String,
            required: true
          },
          color: String
        }
      }
    },
  },
  status: {
    type: String,
    required: true,
    enum: [
      TicketStatus.accepted,
      TicketStatus.delivered,
      TicketStatus.expired,
      TicketStatus.open,
      TicketStatus.rejected
    ],
    default: TicketStatus.open
  }
})

export default mongoose.model("tickets", Schema)