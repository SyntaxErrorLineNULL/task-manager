'use strict';

/**
 * @description ErrEmpty returns when request was with empty data
 * @type {Error}
 */
const ErrEmpty = new Error('empty user data')

/**
 * @description ErrInternal returns when something went wrong in repository
 * @type {Error}
 */
const ErrInternal = new Error('internal error')

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
     * @param { User } user
     * @returns {Promise<User>|Error}
     * @constructor
     */
    async Find(user) {

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
        this.#database.schema.createTableIfNotExists('user', (tableBuilder) => {

        })
    }
}