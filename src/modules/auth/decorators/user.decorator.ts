
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserAuth } from '../../../commons/Interface/auth.interface';

export const UserToken = createParamDecorator(
  (data: undefined, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user as IUserAuth,
);
