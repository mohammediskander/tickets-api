import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../app/models";
import { Keys } from "../config";
import { PassportStatic } from "passport";
import { Request } from "express";

export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: Keys.secretOrKey,
      },
      (payload, done) => {
        User.findById(payload._id)
          .then((account) => {
            if (!account) return;
            else {
              done(null, account);
            }
          })
          .catch((error) => {
            throw error.name;
          });
      }
    )
  );
};
