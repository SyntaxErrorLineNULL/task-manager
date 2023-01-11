export class User {
    id: string;

    username: string;

    email: string;

    password: string;

    phone: string;

    firstName: string;

    lastName: string;

    lastActive: Date;

    status: string;

    role: string;

    createDate: Date;

    /**
     * @param id
     * @param username
     * @param email
     * @param password
     */
    // @ts-ignore
    constructor(id: string, username: string, email: string, password: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;

        this.createDate = new Date();
    }
}