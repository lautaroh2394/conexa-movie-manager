import { applyDecorators } from "@nestjs/common";
import { ApiUnauthorizedResponseDoc } from "./api-unauthorized.decorator";
import { ApiOkResponse } from "@nestjs/swagger";

export const GetProfileDocs = () => applyDecorators(
    ApiUnauthorizedResponseDoc(),
    ApiOkResponse({ 
        description: 'Returns the users data minus the hashed password',
        example: {
            'id': 8,
            'username': 'someuser',
            'roles': [
                'regular_user'
            ]
        }
    }),
)