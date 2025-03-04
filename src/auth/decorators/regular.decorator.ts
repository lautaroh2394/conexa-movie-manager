import { Roles } from "./roles.decorator"
import { Role } from "../roles.enum"

export const RegularUser = () => Roles([Role.REGULAR_USER])