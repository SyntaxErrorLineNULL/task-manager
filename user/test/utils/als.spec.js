import { describe, expect, it } from '@jest/globals';
import { AsynchronousLocalStorage } from '../../utils/context/storage/AsynchronousLocalStorage.js';

describe('async local storage', () => {
  const als = new AsynchronousLocalStorage();
  describe('set is called without running storage', () => {
    it('undefined', () => {
      als.set('key', 'value');
      expect(als.get('key')).toBeUndefined();
    });
  });
});
