/**
 * Author: SyntaxErrorLineNULL.
 */

import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { GuardOptionsFactory } from './guard-module.factory';
import { IGuardModuleOptions } from './guard-module.options';

export interface GuardModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<GuardOptionsFactory>;
  useClass?: Type<GuardOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<IGuardModuleOptions> | IGuardModuleOptions;
  inject?: any[];
}
