/**
 * Author: SyntaxErrorLineNULL.
 */

import { DynamicModule, Provider, Type } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AsyncOption } from './interface/async.option';

export abstract class DynamicAsyncModule {
  public static registerModule(module: Type<any>, options: AsyncOption, dynamicOptions: ModuleMetadata = null): any {
    const providerData: Provider[] = this.createAsyncProviders(options);
    return this.createAsyncModuleProviders(module, providerData, options, dynamicOptions);
  }

  private static createAsyncProviders(options: any): Provider[] {
    const providerData: Provider[] = [];
    if (options && options.useFactory) {
      providerData.push({
        provide: randomUUID(),
        useFactory: options.useFactory,
        inject: options.inject || [],
      });
    }
    return providerData;
  }

  private static createAsyncModuleProviders(
    moduleRegister: Type<any>,
    providerData: Provider[],
    options,
    dynamicOptions,
  ): DynamicModule {
    const moduleObject: DynamicModule = {
      module: moduleRegister,
      imports: (options && options?.imports) || [],
      providers: [...providerData],
      controllers: [],
      exports: [],
    };

    if (dynamicOptions) {
      if (dynamicOptions.imports?.length) {
        moduleObject.imports?.push(...dynamicOptions.imports);
      }

      if (dynamicOptions.providers?.length) {
        moduleObject.providers?.push(...dynamicOptions.providers);
      }

      if (dynamicOptions.controllers?.length) {
        moduleObject.controllers?.push(...dynamicOptions.controllers);
      }

      if (dynamicOptions.exports?.length) {
        moduleObject.exports?.push(...dynamicOptions.exports);
      }
    }

    return moduleObject;
  }
}
