import { Config } from '../../core/config.js';
import path from 'node:path';
import { describe, expect, it, test } from '@jest/globals';

describe('test config loader', () => {
  describe('', () => {
    it('', () => {
      const filePath = path.resolve(process.cwd(), './.env.test');
      const config = new Config(filePath);
      expect(config.getParameter('APP_NAME')).toBe('test-application');
      expect(config.getParameter('PORT')).toBe('3000');
      expect(config.getParameter('DEBUG')).toBe('true');
      expect(config.getParameter('EMPTY_DATA')).toBe('``');
      expect(config.getParameter('SINGLE_QUOTES_SPACED')).toBe('    single quotes    ');
      expect(config.getParameter('DOUBLE_QUOTES')).toBe('double_quotes');
      expect(config.getParameter('DOUBLE_QUOTES_SPACED')).toBe('    double quotes    ');
    })
  })
});
