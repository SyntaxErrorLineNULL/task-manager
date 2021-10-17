/**
 * Author: SyntaxErrorLineNULL.
 */

import { AbstractTest } from '../../../common/App/abstract-test';
import supertest from 'supertest';
import { HttpStatus } from '@nestjs/common';

describe('simple test', () => {
  let application: AbstractTest;

  beforeAll(async () => {
    application = await AbstractTest.initApplication();
    await application.app.init();
  });

  describe('/hello', () => {
    test('test', async () => {
      const response: supertest.Response = await supertest(application.app.getHttpServer())
        .get('/task')
        .set('Accept', 'application/json')
        .expect(HttpStatus.OK)
        .expect('Hello World!');
    });
  });
});
