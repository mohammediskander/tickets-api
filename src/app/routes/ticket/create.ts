import {Request, Response, NextFunction} from "express";
import { Ticket, TicketInterface } from "../../models"

export default (request: any, response: Response, next: NextFunction) => {
  console.log(request.body)
  new Ticket({
    name: request.body.name,
    user: request.user._id,
    description: request.body.description,
    details: {
      type: request.body.details.type,
      expectedDeliveryDate: request.body.details.expectedDeliveryDate,
      driver: {
        car: {
          model: request.body.details.driver.car.model,
          licencePlate: request.body.details.driver.car.licencePlate,
          color: request.body.details.driver.car.color
        },
        name: request.body.details.driver.name,
      }
    },
    status: request.body.status
  })
    .save()
    .then((ticket: TicketInterface) => {
      if (!ticket) {
        response.status(400)
        next(new Error("ticketTreationError"))
      } else {
        response.json(ticket)
      }
    })
    .catch(error => {
      response.status(404)
      next(error)
    })
}