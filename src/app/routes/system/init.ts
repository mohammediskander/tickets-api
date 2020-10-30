import { Request, Response, NextFunction } from "express"
import { Role, System, RoleInterface, SystemInterface} from "../../models"

export default (request: Request, response: Response, next: NextFunction) => {

  Role.create<[RoleInterface]>([
    {
      name: "admin",
      privileges: [
        {
          model: "users",
          accessRights: {
            create: true,
            fetch: true,
            gets: true,
            patch: true,
            delete: true
          }
        }
      ]
    }
  ], (error, roles) => {
    if (error) {
      response.status(400)
      next(error)
    } else {
      new System({
        defaults: {
          ROLE: roles[0],
        },
        project: {
          name: "ALXSANDER TICKET",
          uri: "http://api.alexsandertickets.me/v1/",
          description: "ALEXSANDER TICKETS APIv1"
        }
      })
        .save()
        .then<SystemInterface>((system: SystemInterface): any => {
          response.json({
            success: "System has been initialized successfully!"
          })
        })
        .catch(() => {
          response.status(400);
          next(new Error("unkownError"));
        })
    }
  })
}