import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { ApiUnauthorizedResponseDoc } from "./../../../src/auth/doc/api-unauthorized.decorator";
import { ApiForbiddenResponseDoc } from "./api-forbidden.decorator";

export const CreateMovieDocs = () => applyDecorators(
    ApiOperation({description: 'Creates a new movie. Admin users can access this endpoint'}),
    ApiUnauthorizedResponseDoc(),
    ApiForbiddenResponseDoc(),
)