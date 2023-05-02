import { knex } from 'knex';
import { beforeAll, describe } from "@jest/globals";

describe('UserRepository test', () => {
    let repo;
    let database;

    beforeAll(() => {
        database = knex({
            client: 'pg',
            connection: {
                host: '127.0.0.1',
                port: '5432',
                user: 'app',
                password: 'secret',
                database: 'app',
            },
        });
    });
})