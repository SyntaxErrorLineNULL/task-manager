const AsynchronousLocalStorage = require('../../../lib/als/als.js')
const { describe, it, expect, beforeEach } = require('@jest/globals');
const { AsyncLocalStorage } = require('node:async_hooks');

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

describe('AsynchronousLocalStorage', () => {
    let asyncLocalStorage;

    beforeEach(() => {
        asyncLocalStorage = new AsynchronousLocalStorage(null);
    });

    describe('initStorage', () => {
        it('should run the function within a new store', () => {
            const fn = jest.fn();
            asyncLocalStorage.initStorage({ foo: 'bar' }, fn);
            expect(fn).toHaveBeenCalled();
        });
    });

    describe('get', () => {
        it('should throw an error if key is empty', async () => {
            await expect(asyncLocalStorage.get('')).rejects.toThrow('key is empty');
        });

        it("should throw an error if storage doesn't exist", async () => {
            await expect(asyncLocalStorage.get('foo')).rejects.toThrow("Storage doesn't exist");
        });

        it('should get a value from the store if key exists', async () => {
            asyncLocalStorage.create({ foo: 'bar' });
            const result = await asyncLocalStorage.get('foo');
            expect(result).toEqual('bar');
        });

        it('should return undefined if key does not exist', async () => {
            asyncLocalStorage.create({});
            const result = await asyncLocalStorage?.get('foo');
            await expect(result).rejects.toThrowError("Context data is empty");
        });
    });

    describe('create', () => {
        it('should throw an error if context data is empty', async () => {
            await expect(asyncLocalStorage.create(null)).rejects.toThrow('Context data is empty');
        });

        it('should enter with the given context data', async () => {
            const context = { foo: 'bar' };
            await asyncLocalStorage.create(context);
            const store = asyncLocalStorage.all();
            expect(store).toEqual(context);
        });
    });

    describe('set', () => {
        it('should throw an error if key is empty', async () => {
            await expect(asyncLocalStorage.set('', 'value')).rejects.toThrow('Key is empty');
        });

        it('should throw an error if value is empty', async () => {
            await expect(asyncLocalStorage.set('key', '')).rejects.toThrow('Value is empty');
        });

        it('should set a value in the store if store exists and is a Map', async () => {
            asyncLocalStorage.create(new Map());
            await asyncLocalStorage.set('foo', 'bar');
            const result = await asyncLocalStorage.get('foo');
            expect(result).toEqual('bar');
        });

        it('should set a value in the store if store exists and is an object', async () => {
            asyncLocalStorage.create({});
            await asyncLocalStorage.set('foo', 'bar');
            const result = await asyncLocalStorage.get('foo');
            expect(result).toEqual('bar');
        });

        it('should set a value in the default store if store does not exist', async () => {
            asyncLocalStorage.set('foo', 'bar');
            const result = await asyncLocalStorage.get('foo');
            expect(result).toEqual('bar');
        });
    });

    describe('all', () => {
        it('should return an empty object if store does not exist', async () => {
            const result = asyncLocalStorage.all();
            expect(result).toEqual({});
        });

        it('should return all data in the store', async () => {
            asyncLocalStorage.create({ foo: 'bar', baz: 'qux' });
            const result = asyncLocalStorage.all();
            expect(result).toEqual({ foo: 'bar', baz: 'qux' });
        });
    });
});
