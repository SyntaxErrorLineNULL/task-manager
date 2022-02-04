/**
 * Author: SyntaxErrorLineNULL.
 */

import { Module } from '@nestjs/common';
import { GuardModule } from './guard.module';
import { DynamicAsyncModule } from '../dynamic/dynamic.module';
import { AsyncOption } from '../dynamic/interface/async.option';

@Module({})
export class GuardAsyncRegistrationModule extends DynamicAsyncModule {
  public static forRootAsync(options: AsyncOption) {
    return this.registerModule(GuardAsyncRegistrationModule, options, {
      imports: [GuardModule],
      providers: [],
      exports: [GuardModule],
    });
  }
}
