import { Role } from "src/auth/constants";

export class CreateUserDto {
    username: string;
    hashedPassword: string;
    roles: Role[]
}