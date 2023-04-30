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
     * @returns {Promise<void>}
     * @constructor
     */
    async Create(user) {}

    async Update(user) {}

    async Find(user) {}

    async Delete(id) {}

    async CheckExists() {}

    #createTable() {
        this.#database.schema.createTableIfNotExists('user', (tableBuilder) => {

        })
    }
}