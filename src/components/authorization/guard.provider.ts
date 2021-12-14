/**
 * Author: SyntaxErrorLineNULL.
 */

export const GUARD_PROVIDER = 'GUARD_PROVIDER';

export interface GuardProvider {
  searchByEmail(email: string): Promise<any>;
}
