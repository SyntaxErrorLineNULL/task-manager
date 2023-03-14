'use strict';

/**
 * @param { string|number|Array|Object } value
 * @returns { boolean }
 */
const isValueEmpty = (value) => {
    switch (typeof value) {
        case 'undefined':
            return true;
        case 'string':
            return value.trim() === '';
        case 'object':
            if (value === null) {
                return true;
            }
            if (Array.isArray(value)) {
                return value.length === 0;
            }
            return Object.keys(value).length === 0;
        default:
            return false;
    }
}

module.exports = { isValueEmpty };