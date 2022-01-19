/**
 * Author: SyntaxErrorLineNULL.
 */

export const GUARD_DATA_PROVIDER = 'GUARD_DATA_PROVIDER';

export interface GuardProvider {
  provideByEmail(email: string): Promise<any>;

  provideJWTToken(id: string): Promise<any>;
}
