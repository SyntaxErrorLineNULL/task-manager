'use strict';

export class User {
    ID;

    Email

    UserName;

    FirstName;

    LastName

    #password;

    CreateDate;

    constructor() {}

    get ID() {
        return this.ID;
    }

    get Email() {
        return this.Email;
    }

    set Email(email) {
        this.Email = email;
    }

    get UserName() {
        return this.UserName;
    }
}