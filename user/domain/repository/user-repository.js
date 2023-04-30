'use strict';

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
    async Create(user) {}

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
    async Find(user) {}

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