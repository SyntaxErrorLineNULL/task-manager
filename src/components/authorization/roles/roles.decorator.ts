/**
 * Author: SyntaxErrorLineNULL.
 */

import { Role } from '../../../modules/user/enum/role';
import { SetMetadata } from '@nestjs/common';

const ROLES = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES, roles);
