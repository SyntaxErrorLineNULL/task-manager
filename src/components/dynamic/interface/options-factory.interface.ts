/**
 * Author: SyntaxErrorLineNULL.
 */

import { ModuleOptions } from './module-options';

export interface OptionsFactoryInterface {
  createOptions(): Promise<ModuleOptions> | ModuleOptions;
}
