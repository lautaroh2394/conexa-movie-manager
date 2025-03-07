import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiParam } from "@nestjs/swagger";
import { ApiNotFoundResponseDoc } from "./api-not-found.decorator";
import { ApiUnauthorizedResponseDoc } from "./../../../src/auth/doc/api-unauthorized.decorator";
import { ApiForbiddenResponseDoc } from "./api-forbidden.decorator";

export const UpdateMovieDocs = () => applyDecorators(
    ApiOperation({description: 'Updates an existing movie by id. Admin users can access this endpoint'}),
    ApiParam({ name: 'id' }),
    ApiNotFoundResponseDoc(),
    ApiUnauthorizedResponseDoc(),
    ApiForbiddenResponseDoc(),
)