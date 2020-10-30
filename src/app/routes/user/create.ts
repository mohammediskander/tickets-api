import { Request, Response, NextFunction } from "express";
import { User, UserInterface } from "../../models"
import Utils from "../../../@utils"

export default (request: Request, response: Response, next: NextFunction) => {
  User.findOne({ email: request.body.email })
    .collation({
      locale: "en",
      strength: 1
    })
    .then((user: UserInterface) => {
      if (user) {
        response.status(409)
        next(new Error("emailAlreadyRegistered"));
      } else {
        Utils.hash(request.body.password)
          .then(password => {
            new User({
              email: request.body.email,
              password,
              name: request.body.name,
            })
              .save()
              .then((user?: UserInterface) => {
                if (user) {
                  Utils.sign({
                    _id: user._id,
                  }, 1000)
                    .then((token) => {
                      response.json({
                        user,
                        __token: token
                      })
                    })
                    .catch(error => {
                      response.status(400)
                      next(error)
                    })
                }
            })
            .catch(error => {
              response.status(400)
              next(error)
            })
          })
          .catch(error => {
            response.status(400)
            next(error)
          })
      }
    })
    .catch(error => {
      response.status(400)
      next(error)
    })
}