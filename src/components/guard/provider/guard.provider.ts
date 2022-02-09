/**
 * Author: SyntaxErrorLineNULL.
 */

import { Role } from '../../../modules/user/enum/role';

export const GUARD_DATA_PROVIDER = 'GUARD_DATA_PROVIDER';

export interface GuardProvider {
  provideByEmail(email: string): Promise<any>;

  provideJWTToken(id: string, roles: Role): Promise<any>;
}
