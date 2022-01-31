/**
 * Author: SyntaxErrorLineNULL.
 */

import { Type } from '@nestjs/common';
import { OptionsFactoryInterface } from './options-factory.interface';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface AsyncOption extends Pick<ModuleMetadata, 'imports'> {
  inject?: Type<any[]>;
  useClass?: Type<OptionsFactoryInterface>;
  useFactory?: (...args: unknown[]) => Promise<OptionsFactoryInterface> | OptionsFactoryInterface;
  useExisting?: Type<OptionsFactoryInterface>;
}
