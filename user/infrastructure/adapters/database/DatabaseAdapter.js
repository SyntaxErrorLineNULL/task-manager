/**
 * @interface
 * @memberof module:Adapters
 */
class DatabaseAdapter {
    constructor(config) {
        this.config = config;
    }

    async connect() {}

    async disconnect() {}

    async query(sql, params) {}

    async select(table, criteria) {}

    async insert(table, data) {}

    async update(table, data, criteria) {}

    async delete(table, criteria) {}

    async transaction(callback) {}
}
