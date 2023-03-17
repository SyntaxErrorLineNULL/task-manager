'use strict';

const { AsyncLocalStorage } = require('node:async_hooks');
const { isValueEmpty } = require('../utils/utils')

/**
 * @export
 * @class AsynchronousLocalStorage
 */
class AsynchronousLocalStorage {
    /**
     * @param { AsyncLocalStorage } asyncLocaleStorage
     * @private
     */
    #asyncLocaleStorage;

    /**
     * @description
     * @param {Map|Object} #defStorage;
     * @private
     */
    #defStorage;

    /**
     * @description
     * @param {Map|Object|null}  defStorage
     */
    constructor (defStorage) {
        if (defStorage === null) {
            this.#defStorage = new Map();
        }
        this.#asyncLocaleStorage = new AsyncLocalStorage();
    }

    /**
     * @description Runs a function synchronously within a context and returns its return value.
     * The store is not accessible outside the callback function.
     * The store is accessible to any asynchronous operations created within the callback.
     * The optional args are passed to the callback function.
     * @link https://nodejs.org/api/async_context.html#asynclocalstoragerunstore-callback-args
     * @param { Object } context
     * @param { Function } fn
     * @returns { * }
     */
    initStorage (context, fn) {
        const store = context instanceof Map ? context : new Map(Object.entries(context));
        this.#asyncLocaleStorage.run(store, () => {
            fn();
        });
    }
    initSimpleStorage (callback) {
        return this.#asyncLocaleStorage.run(this.#defStorage, callback());
    }

    /**
     * Get the current execution data from storage.
     * @link https://nodejs.org/api/async_context.html#asynclocalstoragegetstore
     * @param { string } key
     * @returns { ( Object | undefined ) }
     */
     async get (key) {
        if (isValueEmpty(key)) {
            throw new Error('key is empty')
        }

        const store = this.#asyncLocaleStorage.getStore();
        if (store === undefined) {
            throw new Error("Storage doesn't exist")
        }
        if (Object.keys(store).length === 0 || store.length === 0) {
            throw new Error('Storage is empty')
        }

        if (store instanceof Map) {
            return store.get(key);
        }
        return store[key];
    }

    /**
     * @description Set the current execution data in storage.
     * @link https://nodejs.org/api/async_context.html#asynclocalstorageenterwithstore
     * @param { Object } context
     */
    async create (context) {
        if (isValueEmpty(context)) {
            throw new Error('Context data is empty')
        }

        if (this.#defStorage instanceof Map) {
            this.#asyncLocaleStorage.enterWith(new Map(Object.entries(context)));
        }

        this.#asyncLocaleStorage.enterWith(context);
    }

    /**
     * @description Set data in storage.
     * @param { string } key
     * @param { string|number } value
     */
    async set (key, value) {
        if (isValueEmpty(key)) {
            throw new Error('Key is empty')
        }
        if (isValueEmpty(value)) {
            throw new Error('Value is empty')
        }

        let store = this.#asyncLocaleStorage.getStore();
        if (!store) {
            store = this.#defStorage;
            this.#asyncLocaleStorage.run(store);
        }

        if (store instanceof Map) {
            store.set(key, value);
        }
        store[key] = value;
    }

    /**
     * @description return all storage data.
     * @link https://nodejs.org/dist/latest/docs/api/async_context.html#asynclocalstoragegetstore
     * @returns { Map|Object|undefined }
     */
    all () {
        const store = this.#asyncLocaleStorage.getStore();
        return store === undefined ? {} : store;
    }
}

module.exports = AsynchronousLocalStorage;