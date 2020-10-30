import { RouteInterface } from "../../@utils/routes"
import system from "./system"
import user from "./user"
import authentication from "./authentication"
import ticket from "./ticket"

const routes: RouteInterface[] = [
  ...user,
  ...system,
  ...authentication,
  ...ticket
];

export default routes;
