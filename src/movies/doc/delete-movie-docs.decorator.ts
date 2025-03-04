import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ApiNotFoundResponseDoc } from "./api-not-found.decorator";
import { ApiUnauthorizedResponseDoc } from "./../../../src/auth/doc/api-unauthorized.decorator";
import { ApiForbiddenResponseDoc } from "./api-forbidden.decorator";

export const DeleteMovieDocs = () => applyDecorators(
    ApiOperation({description: 'Deletes an existing movie by id. Admin users can access this endpoint'}),
    ApiOkResponse({description: 'Does not return a body'}),
    ApiNotFoundResponseDoc(),
    ApiUnauthorizedResponseDoc(),
    ApiForbiddenResponseDoc(),
)