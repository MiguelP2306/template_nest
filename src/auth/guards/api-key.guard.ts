import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

// Decorators
import { IS_PUBLIC } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.header('Auth');

    const isAuth = authHeader === IS_PUBLIC;

    if (!isAuth) {
      throw new UnauthorizedException('not allow');
    }
    return true;
  }
}
