import JsonWebToken from "jsonwebtoken"
import Keys from "../config/keys"

class Utils {

  static getLocale = (headers: any): string => {
    console.log(headers)
    if (headers["accept-language"]) {
      return headers["accept-language"].match(/^([a-z]{2})\b/)[0]
    } else {
      return "en"
    }
  }

  static async sign(payload = {}, expiresIn = 1000): Promise<string> {
    return new Promise((resolve, reject) => {
      JsonWebToken.sign(
        payload,
        Keys.secretOrKey,
        { expiresIn },
        (error, token) => {
          if (error) reject(error);
          else resolve(`Bearer ${token}`);
        }
      );
    });
  }
}


export default Utils