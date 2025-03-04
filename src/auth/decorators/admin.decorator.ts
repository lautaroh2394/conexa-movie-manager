import { Role } from "../roles.enum"
import { Roles } from "./roles.decorator"

export const Admin = () => Roles([Role.ADMIN])