import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { ApiUnauthorizedResponseDoc } from "src/auth/doc/api-unauthorized.decorator";

export const FindAllMovieDocs = () => applyDecorators(
    ApiOperation({description: 'Returns a list of movies. Every user can access this endpoint'}),
    ApiUnauthorizedResponseDoc(),
)