import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "../constants";
import { IsRoleArray } from "../decorators/is-role-array.decorator";

export class SignUpDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty({ 
        description: 'Should be at least eight characters long, have at least 1 lowercase, 1 uppercase, 1 number, 1 symbol',
        example: "Str0ngPassword!"
    })
    @IsString()
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})
    password: string;

    @ApiProperty({ 
        description: 'An array of user roles. Not required', 
        example: ['admin', 'regular_user'],
        required: false,
    })
    @IsOptional()
    @IsRoleArray()
    @IsArray()
    roles: Role[] = []
}