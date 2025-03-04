import { ApiNotFoundResponse } from "@nestjs/swagger";

export const ApiNotFoundResponseDoc = ()=> 
    ApiNotFoundResponse({description: 'Resource not found', example: {
        "message": "Not Found",
        "statusCode": 404
    }})