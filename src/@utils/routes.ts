import { RequestHandler, Router } from "express";
import passport from "passport";

export interface RouteInterface {
  path: string;
  function: RequestHandler;
  description?: string;
  enabled: boolean;
  roles?: object[];
  access: "public" | "private";
  method: "post" | "get" | "patch" | "delete";
}

interface ExceptionHandler {
  message: string;
  status: number;
}

declare global {
  namespace Express {
    export interface Request {
      error: ExceptionHandler;
    }
  }
}

class Routes {
  private routes: RouteInterface[];
  private router: Router = Router();

  constructor(routes: RouteInterface[]) {
    this.setRoutes(routes);
  }

  private setRoutes = (routes: RouteInterface[]) => {
    this.routes = routes;
    return this;
  };

  private getRoutes = (): RouteInterface[] => {
    return this.routes;
  };

  public configureRoutes = (): Router => {
    this.getRoutes().forEach((route: RouteInterface) => {
      if (route.enabled) {
        if (route.access === "private")
          this.router[route.method](
            route.path,
            passport.authenticate("jwt", { session: false }),
            route.function
          );
        else this.router[route.method](route.path, route.function);
      }
    });

    return this.router;
  };
}

export default Routes;
