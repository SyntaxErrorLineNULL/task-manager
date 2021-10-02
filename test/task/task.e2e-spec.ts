/**
 * Author: SyntaxErrorLineNULL.
 */

import request from 'supertest';
import { HttpStatus } from '@nestjs/common';

describe('Task Controller', () => {
  const url = `http://localhost:3000/task`;

  describe('/hello', () => {
    it('test method', () => {
      return request(url).get('/').set('Accept', 'application/json').expect(HttpStatus.OK).expect('Hello World!');
    });
  });
});
