/**
 * Author: SyntaxErrorLineNULL.
 */

import { IGuardModuleOptions } from './guard-module.options';

export interface GuardOptionsFactory {
  createGuardOptions(): Promise<IGuardModuleOptions> | IGuardModuleOptions;
}
