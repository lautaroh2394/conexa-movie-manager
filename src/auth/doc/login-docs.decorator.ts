import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { ApiUnauthorizedResponseDoc } from "./api-unauthorized.decorator";

export const LoginDocs = () => applyDecorators(
    ApiOkResponse({ 
        description: 'User logged in succesfully', 
        example: {
            "access_token": "some-long-token"
        }
    }),
    ApiUnauthorizedResponseDoc('Failed to validate credentials'),
)