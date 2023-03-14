const { isValueEmpty } = require('../../../lib/utils/utils.js')

describe('CheckDataTypeAndCheckEmpty', () => {
    test('returns true for undefined', () => {
        expect(isValueEmpty(undefined)).toBe(true);
    });

    test('returns true for empty string', () => {
        expect(isValueEmpty('')).toBe(true);
        expect(isValueEmpty('   ')).toBe(true);
    });

    test('returns false for non-empty string', () => {
        expect(isValueEmpty('hello')).toBe(false);
        expect(isValueEmpty('  hello  ')).toBe(false);
    });

    test('returns true for null', () => {
        expect(isValueEmpty(null)).toBe(true);
    });

    test('returns true for empty array', () => {
        expect(isValueEmpty([])).toBe(true);
    });

    test('returns false for non-empty array', () => {
        expect(isValueEmpty([1, 2, 3])).toBe(false);
    });

    test('returns true for empty object', () => {
        expect(isValueEmpty({})).toBe(true);
    });

    test('returns false for non-empty object', () => {
        expect(isValueEmpty({ a: 1 })).toBe(false);
    });

    test('returns false for number', () => {
        expect(isValueEmpty(0)).toBe(false);
        expect(isValueEmpty(1)).toBe(false);
    });

    test('returns false for boolean', () => {
        expect(isValueEmpty(false)).toBe(false);
        expect(isValueEmpty(true)).toBe(false);
    });
});