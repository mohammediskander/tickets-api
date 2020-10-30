import { Request, Response, NextFunction } from "express";
import { User, UserInterface } from "../../models";
import bcrypt from "bcryptjs";
import Utils from "../../../@utils";

export default (request: Request, response: Response, next: NextFunction) => {
  User.findOne({
    email: request.body.email
  })
    .collation({
      locale: "en",
      strength: 1,
    })
    .populate("roles")
    .then((user: UserInterface) => {
      if (!user) {
        response.status(404);
        next(new Error("userNotFound"))
      } else {
        bcrypt
          .compare(request.body.password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              response.status(404);
              next(new Error("passwordNotCorrect"));
            } else {
              Utils.sign(
                {
                  _id: user._id,
                },
                10000
              ).then(token => {
                return response.json({
                  user,
                  __token: token
                })
              })
              .catch(error => {
                response.status(400);
                next(error)
              })
            }
          })
          .catch(error => {
            response.status(400);
            next(error)
          })
      }
    })
    .catch(error => {
      response.status(400);
      next(error)
    })
}