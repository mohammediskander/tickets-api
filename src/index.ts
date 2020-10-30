import Express from "express";
// import Cors from "cors";
import passport from "passport";
import Routes from "./@utils/routes";
import routes from "./app/routes";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import Translation from "./@utils/translation";
import keys from "./config/keys";
// import { Passport as PassportJwt } from "./services";

export const configureServer = (app: any) => {
  app.use(Express.json({ limit: "5mb" }));
  // app.use(Cors());
  app.use(
    bodyParser.urlencoded({
      extended: false,
      limit: "5mb",
    })
  );
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(morgan("common"));
  app.use(helmet());
  app.use(passport.initialize())
  // PassportJwt(passport)

  mongoose
    .connect(keys.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`MongoDB Connected Successfully!`);
    })
    .catch((error: any) => {
      console.log(error.message);
    });

  app.use("/api/v1", new Routes(routes).configureRoutes());
  app.use(
    (
      request: Express.Request,
      response: Express.Response,
      next: Express.NextFunction
    ) => {
      const error = new Error(`notFound`);
      response.status(404);
      next(error);
    }
  );
  app.use(
    (
      error: any,
      request: Express.Request,
      response: Express.Response,
      next: Express.NextFunction
    ) => {
      const statusCode =
        response.statusCode === 200 ? 500 : response.statusCode;
      response.status(statusCode);
      response.json({
        name: new Translation(
            request.headers["accept-language"]
              ? request.headers["accept-language"].match(/^([a-z]{2})\b/)[0] ||
                undefined
              : undefined
          ).getMessage(error.message),
        // name: error.message,
        statusCode: response.statusCode,
        stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
      });
    }
  );
};
