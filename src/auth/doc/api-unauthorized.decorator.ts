import { ApiUnauthorizedResponse } from "@nestjs/swagger";

export const ApiUnauthorizedResponseDoc = (message = 'The user is not logged in or does not have the role to access this resource')=> ApiUnauthorizedResponse({ 
    description: message,
    example: {
        "message": "Unauthorized",
        "statusCode": 401
    }
})