import { IsString } from "class-validator";

export class SignUpDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString({each: true})
    roles: string[] = []
}