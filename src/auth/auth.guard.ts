import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./decorators/public.decorator";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
        private readonly usersService: UsersService,
    ) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ]
        );
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request);
        if (!token) throw new UnauthorizedException()
        
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                { secret: jwtConstants.secret}
            );
            const roles = await this.usersService.getRolesFor(payload.username)
            request['user'] = {...payload, roles}
        }
        catch (e) { throw new UnauthorizedException() }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authorizationHeader = request.headers['authorization'];
        if (!authorizationHeader) return undefined;

        const [type, token] = authorizationHeader.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}