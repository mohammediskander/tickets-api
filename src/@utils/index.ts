import { Request } from "express"
import { IncomingHttpHeaders } from "http";

class Utils {

  static getLocale = (headers: any): string => {
    console.log(headers)
    if (headers["accept-language"]) {
      return headers["accept-language"].match(/^([a-z]{2})\b/)[0]
    } else {
      return "en"
    }
  }
}


export default Utils