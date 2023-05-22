'use strict';

import * as crypto from 'node:crypto';

/**
 * Utility class for cryptographic operations.
 */
export class Crypto {
  /**
   * Generates a random base64-encoded string of specified byte length.
   * @param {number} count - The number of random bytes to generate.
   * @returns {string} - The generated base64-encoded string.
   */
  randomBytesBase64(count) {
    return crypto.randomBytes(count).toString('base64');
  }

  /**
   * Decodes a base64-encoded string to UTF-8 format.
   * @param {string} base64 - The base64-encoded string to decode.
   * @returns {string} - The decoded UTF-8 string.
   */
  decodeBase64StringUtf8(base64) {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }

  /**
   * Encodes a UTF-8 string to base64 format.
   * @param {string} text - The UTF-8 string to encode.
   * @returns {string} - The encoded base64 string.
   */
  encodeBase64StringUtf8(text) {
    return Buffer.from(text, 'utf-8').toString('base64');
  }

  /**
   * Converts a Node.js Buffer to an ArrayBuffer.
   * @param {Buffer} buffer - The Node.js Buffer to convert.
   * @returns {ArrayBuffer} - The converted ArrayBuffer.
   */
  toArrayBuffer(buffer) {
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    );
  }

  /**
   * Converts an ArrayBuffer to a Node.js Buffer.
   * @param {ArrayBuffer} arrayBuffer - The ArrayBuffer to convert.
   * @returns {Buffer} - The converted Node.js Buffer.
   */
  toBuffer(arrayBuffer) {
    return Buffer.from(arrayBuffer);
  }
}
