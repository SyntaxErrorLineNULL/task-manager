'use strict';

import { knex } from 'knex';
import { User } from '../entity/user';
import { re } from "@babel/core/lib/vendor/import-meta-resolve.js";

/**
 * @description ErrEmpty returns when request was with empty data
 * @type {Error}
 */
const ErrEmpty = new Error('empty user data');

/**
 * @description ErrInternal returns when something went wrong in repository
 * @type {Error}
 */
const ErrInternal = new Error('internal error');

/**
 * @description ErrNotFound returns when user not in database
 * @type {Error}
 */
const ErrNotFound = new Error("user not found")

export class UserRepository {
    /**
     * @param { knex.Client } database
     */
    #database;

    /**
     * @param { ILogger } logger
     */
    #logger;

    constructor(client, logger) {
        this.#database = client;
        this.#logger = logger;
    }

    /**
     * @param { User } user
     * @returns {Promise<void>|Error}
     * @constructor
     */
    async Create(user) {
        this.#logger.Info('Create new user');
        if (user === null) {
            this.#logger.Error('user is null', { duration: Date.now() });
            throw ErrEmpty;
        }

        try {
            const command = `INSERT INTO "user" (id, email, username, first_name, last_name, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            await this.#database.raw(command, [user.ID, user.Email, user.UserName, user.FirstName, user.LastName, user.Password]);
            this.#logger.Info('user created successfully');
        } catch (err) {
            this.#logger.Error('insert error', { duration: Date.now(), error: err.message });
            throw ErrInternal;
        }
    }

    /**
     *
     * @param { User } user
     * @returns {Promise<void>|Error}
     * @constructor
     */
    async Update(user) {}

    /**
     *
     * @param { string } query
     * @returns {Promise<User>|Error}
     * @constructor
     */
    async Find(query) {
        this.#logger.Info('Create new user');
        if (query === '') {
            this.#logger.Error('user is null', { duration: Date.now() });
            throw ErrEmpty;
        }

        try {
            const command = `SELECT * FROM "user" WHERE id = ? OR email = ? OR username = ?`;
            /**
             * @param { User } user
             */
            const [user] = await this.#database.raw(command, [query])
            if (user === null || user === undefined) {
                this.#logger.Error('user not found in database', { duration: Date.now() });
                throw ErrNotFound;
            }

            return user;
        } catch (err) {
            this.#logger.Error('find user error', { duration: Date.now(), error: err.message });
            throw ErrInternal;
        }
    }

    /**
     * @param { string } id
     * @returns {Promise<void>|Error}
     * @constructor
     */
    async Delete(id) {}

    /**
     *
     * @param { string } query
     * @returns {Promise<boolean>|Error}
     * @constructor
     */
    async CheckExists(query) {}

    #createTable() {
        this.#logger.Info('create index')
        this.#database.hasTable('user').then((exists) => {
            if (!exists) {
                this.#database.schema.createTableIfNotExists('users', (tableBuilder) => {
                    tableBuilder.uuid('id', { useBinaryUuid: true, primaryKey: true });
                    tableBuilder.string('email', 128);
                    tableBuilder.string('username', 64)
                    tableBuilder.string('first_name', 64);
                    tableBuilder.string('last_name', 64);
                    tableBuilder.text('password', 'longtext');
                    tableBuilder.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

                    tableBuilder.unique(['email', 'username'])
                });
            }
        });
    }
}