import { SetMetadata, applyDecorators } from '@nestjs/common';

import { ROLES } from '../../../commons/models';
import { ApiOperation } from '@nestjs/swagger';
import { DecoratorRoleType } from './roles_type.decorator';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: ROLES[]) => SetMetadata(ROLES_KEY, roles);

export const AllRoles = (): DecoratorRoleType =>
  applyDecorators(
    SetMetadata(ROLES_KEY, Object.values(ROLES)),
    ApiOperation({ description: 'All roles are allowed for this operation.' })
  );
