'use strict';

import { knex } from 'knex';

/**
 * @param { knex.Client } client
 */
const createIndexes = (client) => {
    return new Promise.all([
        client.raw(`CREATE EXTENSION pg_trgm;`),
        client.raw(`CREATE INDEX users_first_name ON users USING GIN(first_name gin_trgm_ops);`),
        client.raw(`CREATE INDEX users_last_name ON users USING GIN(last_name gin_trgm_ops);`),
        client.raw(`CREATE INDEX users_first_last_name ON users USING GIN((first_name || ' ' || last_name) gin_trgm_ops);`),
        client.raw(`CREATE INDEX users_last_first_name ON users USING GIN((last_name || ' ' || first_name) gin_trgm_ops);`),
    ]);
};

export default createIndexes;