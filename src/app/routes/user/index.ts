import create from "./create";
import fetch from "./fetch";
import { RouteInterface } from "../../../@utils/routes"


const routes: RouteInterface[] = [
  {
    path: "/user/new",
    enabled: true,
    access: "public",
    method: "post",
    description: "Create user",
    function: create
  },
  {
    path: "/user/details",
    enabled: true,
    access: "private",
    method: "get",
    function: fetch
  }
]

export default routes