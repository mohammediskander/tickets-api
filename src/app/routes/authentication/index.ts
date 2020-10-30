import create from "./create";
import validate from "./validate";
import { RouteInterface } from "../../../@utils/routes"

const routes: RouteInterface[] = [
  {
    function: create,
    method: "post",
    access: "public",
    enabled: true,
    path: "/authentication/user/create/access-token",
  },
  {
    function: validate,
    enabled: true,
    method: "post",
    access: "private",
    path: "/authentication/user/validate/access-token",
  },
]

export default routes