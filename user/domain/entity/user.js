'use strict';

export class User {
    ID;

    Email

    UserName;

    FirstName;

    LastName

    Password;

    CreateDate;

    constructor(id, email, username, firstName, lastName, password) {
        this.ID = id;
        this.Email = email;
        this.UserName = username;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Password = password;
    }
}