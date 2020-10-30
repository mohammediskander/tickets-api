import create from "./create";
import { RouteInterface } from "../../../@utils/routes"

const routes: RouteInterface[] = [
  {
    function: create,
    path: "/ticket/create",
    access: "private",
    method: "post",
    enabled: true
  }
]

export default routes