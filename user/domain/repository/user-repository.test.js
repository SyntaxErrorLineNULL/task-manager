import { knex } from 'knex';
import { afterAll, afterEach, beforeAll, beforeEach, describe, jest } from '@jest/globals';
import { UserRepository } from './user-repository.js';

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

    afterAll(() => {
        database.destroy();
    });

    beforeEach(async () => {
        await database.schema.createTable('users', (table) => {
            table.uuid('id').primary();
            table.string('email', 128).unique();
            table.string('username', 64).unique();
            table.string('first_name', 64);
            table.string('last_name', 64);
            table.text('password', 'longtext');
            table.timestamp('created_at').notNullable().defaultTo(database.fn.now());
        });

        repo = new UserRepository(database, {
            Info: jest.fn(),
            Error: jest.fn(),
        });
    });

    afterEach(async () => {
        await database.schema.dropTable('users');
    });
})