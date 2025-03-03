import { Role } from "../constants"
import { Roles } from "./roles.decorator"

export const Admin = () => Roles([Role.ADMIN])