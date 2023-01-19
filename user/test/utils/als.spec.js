import { describe, expect, it } from '@jest/globals';
import { AsynchronousLocalStorage } from '../../utils/context/storage/AsynchronousLocalStorage.js';

describe('async local storage', () => {
  it('undefined', () => {
    const als = new AsynchronousLocalStorage();
    als.set('key', 'value');
    expect(als.get('key')).toBeUndefined();
  });
});
