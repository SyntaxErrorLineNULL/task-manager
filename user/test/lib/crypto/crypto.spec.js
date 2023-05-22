import { describe, expect, it } from '@jest/globals';
import { Crypto } from '../../../lib/Crypto/Crypto.js';

describe('Crypto', () => {
  let crypto;

  beforeEach(() => {
    crypto = new Crypto();
  });

  describe('randomBytesBase64', () => {
    it('should generate a random base64-encoded string of specified length', () => {
      const result = crypto.randomBytesBase64(10);
      expect(result).toHaveLength(16); // 16 bytes = 12 base64 characters
    });
  });

  describe('decodeBase64StringUtf8', () => {
    it('should decode a base64-encoded string to UTF-8 format', () => {
      const base64 = 'SGVsbG8gd29ybGQ='; // 'Hello world' in base64
      const result = crypto.decodeBase64StringUtf8(base64);
      expect(result).toBe('Hello world');
    });
  });

  describe('encodeBase64StringUtf8', () => {
    it('should encode a UTF-8 string to base64 format', () => {
      const text = 'Hello world';
      const result = crypto.encodeBase64StringUtf8(text);
      expect(result).toBe('SGVsbG8gd29ybGQ=');
    });
  });

  describe('toArrayBuffer', () => {
    it('should convert a Buffer to an ArrayBuffer', () => {
      const buffer = Buffer.from('Hello world', 'utf-8');
      const result = crypto.toArrayBuffer(buffer);
      expect(result).toBeInstanceOf(ArrayBuffer);
    });
  });

  describe('toBuffer', () => {
    it('should convert an ArrayBuffer to a Buffer', () => {
      const arrayBuffer = new Uint8Array([72, 101, 108, 108, 111]).buffer; // 'Hello' as ArrayBuffer
      const result = crypto.toBuffer(arrayBuffer);
      expect(result).toBeInstanceOf(Buffer);
      expect(result.toString('utf-8')).toBe('Hello');
    });
  });
});
