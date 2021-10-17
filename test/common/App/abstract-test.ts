/**
 * Author: SyntaxErrorLineNULL.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

export class AbstractTest {
  constructor(public readonly app: NestExpressApplication, public readonly testingModule: TestingModule) {}

  public static async initApplication(): Promise<AbstractTest> {
    const testingModule: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();

    const application: NestExpressApplication = testingModule.createNestApplication();
    return new AbstractTest(application, testingModule);
  }
}
