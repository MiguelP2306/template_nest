import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

// Commons
import { PayloadToken } from '@app/commons';

// Decorators
import { ROLES_KEY } from '../decorators/roles.decorator';

// Models
import { ROLES } from '../../../commons/models';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<ROLES[]>(ROLES_KEY, context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;

    const isAuth = roles.includes(user.role as ROLES);

    if (!isAuth) {
      throw new ForbiddenException(
        "You don't have permissions for this endpoint.",
      );
    }

    return isAuth;
  }
}
