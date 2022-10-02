import Surreal from 'surrealdb.js';

export default class Database{
    constructor() {
        this.db = new Surreal('http://127.0.0.1:8000/rpc');
    }

    async run() {
        // Signin as a namespace, database, or root user
        await this.db.signin({
            user: 'root',
            pass: 'root',
        });

        // Select a specific namespace / database
        await this.db.use('test', 'test');
    }

    async save(username, password) {
        console.log(username, password)
        let created = await this.db.create("user", {
            username: username,
            password: password,
            marketing: true,
            identifier: Math.random().toString(36).substr(2, 10),
        });
    }

    async select(from) {
        return await this.db.select("user");
    }
}