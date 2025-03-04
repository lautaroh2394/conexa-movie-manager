import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse } from "@nestjs/swagger";

export const DocSignUp = () => applyDecorators(
        ApiBadRequestResponse({
            description: 'Some field was invalid',
            examples: 
                { 
                    'invalid-username': {
                        summary: 'Invalid username',
                        value:  {        
                            "message": "Username taken",
                            "error": "Bad Request",
                            "statusCode": 400
                        }
                    },
                    'invalid-passowrd': {
                        summary: 'Invalid password',
                        value: {
                            "message": [
                                "password is not strong enough"
                            ],
                            "error": "Bad Request",
                            "statusCode": 400
                        }
                    },
                    'invalid-role': {
                        summary: 'Invalid roles',
                        value: {
                            "message": [
                                "Roles must be one of: regular_user, admin"
                            ],
                            "error": "Bad Request",
                            "statusCode": 400
                        }
                    }
                }
        }),
        ApiCreatedResponse({
            description: 'User created',
            example: {
                'username': 'miusuario',
                'password': 'S0m3Password',
                'roles': ['regular_user']
            }
        })
)