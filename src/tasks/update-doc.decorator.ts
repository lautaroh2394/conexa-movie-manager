import { applyDecorators } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { ApiOkResponseDoc } from "./doc/api-ok-response-doc.decorator"
import { ApiUnauthorizedResponseDoc } from "src/auth/doc/api-unauthorized.decorator"
import { ApiForbiddenResponseDoc } from "src/movies/doc/api-forbidden.decorator"

export const StarWarsUpdateDocs = () =>
    applyDecorators(
        ApiOperation({description: 'Executes the star wars update task and returns a result. Admin users can access this endpoint'}),
        ApiOkResponseDoc(),
        ApiUnauthorizedResponseDoc(),
        ApiForbiddenResponseDoc(),
    )