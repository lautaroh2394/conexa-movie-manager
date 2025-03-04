import { ApiForbiddenResponse } from "@nestjs/swagger";

export const ApiForbiddenResponseDoc = ()=> ApiForbiddenResponse({ 
    description: 'The user does not have the necessary role to access this resource',
    example: {
        "message": "Forbidden resource",
        "error": "Forbidden",
        "statusCode": 403
    }
})