'use strict';

/**
 * @param { string|number|Array|Object } value
 * @returns { boolean }
 */
const isValueEmpty = (value) => {
    if (value === undefined || value === null) {
        return true;
    }

    if (typeof value === 'string' || value instanceof String) {
        return value.trim() === '';
    }

    if (typeof value === 'number' || value instanceof Number && !isNaN(value)) {
        return false;
    }
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }
    return false;
}

module.exports = { isValueEmpty };