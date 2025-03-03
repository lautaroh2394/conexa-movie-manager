import { Roles } from "./roles.decorator"
import { Role } from "../constants"

export const RegularUser = () => Roles([Role.REGULAR_USER])