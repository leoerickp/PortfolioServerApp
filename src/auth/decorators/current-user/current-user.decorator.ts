import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { ValidRoles } from 'src/users/enums/valid-roles.enums';

export const CurrentUser = createParamDecorator((
    roles: ValidRoles[] = [],
    ctx: ExecutionContext
) => {
    const req = ctx.switchToHttp().getRequest()
    const user: User = req.user;

    if (!user) {
        throw new InternalServerErrorException(`No user inside the request - make sure that we used the AuthGuard`);
    }
    if (roles.length === 0) return user;

    for (const role of user.roles) {
        if (roles.includes(role as ValidRoles)) {
            return user;
        }
    }

    throw new ForbiddenException(`User ${user.name} need a valid role [${roles}]`)
})
