import {Request, Response, NextFunction} from "express";
import {User, UserInterface} from "../../models";
import Utils from "../../../@utils";

export default (request: any, response: Response, next: NextFunction) => {
  User.findById(request.user._id)
    .populate("roles")
    .then((user: UserInterface) => {
      if (user) {
        response.status(404)
        next(new Error("userNotFound"))
      } else {
        Utils.sign({
          _id: user._id
        }, 10000)
          .then((token) => {
            response.json({
              user,
              __token: token
            })
          })
          .catch((error) => {
            response.status(400)
            next(error.message)
          })
      }
    })
    .catch(error => {
      response.status(400)
      next(error.message)
    })
}