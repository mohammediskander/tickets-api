import init from "./init";
import { RouteInterface } from "../../../@utils/routes"

const route: RouteInterface[] = [
  {
    function: init,
    method: "get",
    access: "public",
    enabled: true,
    path: "/system/init"
  }
]

export default route