'use strict';

export class User {
    /**
     * @private
     * @param {string} id
     */
    id;

    /**
     * @private
     * @param {string} password
     */
    password;

    /**
     * @private
     * @param {string} email
     */
    email;

    /**
     * @private
     * @param {string} username
     */
    username;

    /**
     * @private
     * @param {string} phone
     */
    phone;

    /**
     * @private
     * @param {string} firstName
     */
    firstName;

    /**
     * @private
     * @param {string} lastName
     */
    lastName;

    /**
     * @private
     * @param {string} status
     */
    status;

    /**
     * @private
     * @param {string} role
     */
    role;

    /**
     * @private
     * @param {Date} createDate
     */
    createDate;

    /**
     * @private
     * @param {Date} lastActive
     */
    lastActive;

    /**
     * @param {string} id
     * @param {string} username
     * @param {string} email
     * @param {string} password
     */
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;

        this.createDate = new Date();
    }
}