/**
 * Author: SyntaxErrorLineNULL.
 */

import request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

describe('Task Controller', () => {
  let application: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    application = moduleFixture.createNestApplication();
    //await application.init();
    await application.listen(30012);
  });

  describe('/hello', () => {
    it('test method', () => {
      console.log(application.getHttpServer());
      return request(application.getHttpServer())
        .get('/task')
        .set('Accept', 'application/json')
        .expect(HttpStatus.OK)
        .expect('Hello World!');
    });
  });
});
