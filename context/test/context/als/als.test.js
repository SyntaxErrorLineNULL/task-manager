const AsynchronousLocalStorage = require('../../../lib/als/als.js')
const { describe, it, expect } = require('@jest/globals');

describe('async local storage simple test', () => {
    const als = new AsynchronousLocalStorage();
    describe('set is called without running storage', () => {
        it('undefined', () => {
            als.set('key', 'value');
            expect(als.get('key')).toBeUndefined();
        });
    });


    describe('if defaults are used when running a storage', () => {
        it('then the get returns the correct information use math random', (fn) => {
            const rand = Math.random();
            als.initStorage(
                { random: rand },
                () => {
                    expect(als.get('random')).toBe(rand);
                    fn();
                }
            );
        });
    });

    describe('if set is called within context', () => {
        it('then the get returns the correct information', (fn) => {
            als.initStorage(
                { key: 'value' },
                async () => {
                    expect(await als.get('key')).toBe('value');
                    fn();
                });
        });
    });
});

