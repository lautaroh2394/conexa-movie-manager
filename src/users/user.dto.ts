import { Role } from "src/auth/roles.enum";

export class CreateUserDto {
    username: string;
    hashedPassword: string;
    roles: Role[]
}