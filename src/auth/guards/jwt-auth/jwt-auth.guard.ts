import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


export class JwtAuthGuard extends AuthGuard('jwt') {

    getRequest(ctx: ExecutionContext) {
        const request = ctx.switchToHttp().getRequest()

        return request;

    }
}