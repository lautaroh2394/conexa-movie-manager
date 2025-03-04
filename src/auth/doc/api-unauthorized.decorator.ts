import { ApiUnauthorizedResponse } from "@nestjs/swagger";

export const ApiUnauthorizedResponseDoc = (message = 'The user is not logged in')=> ApiUnauthorizedResponse({ 
    description: message,
    example: {
        "message": "Unauthorized",
        "statusCode": 401
    }
})