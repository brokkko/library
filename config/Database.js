import Surreal from 'surrealdb.js';
import {log} from "nodemon/lib/utils";

export default class Database{
    constructor() {
        this.db = new Surreal('http://127.0.0.1:8001/rpc');
        this.run().then(r => console.log(r.toString()));
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
        let created = await this.db.create("user", {
            username: username,
            password: password,
            marketing: true,
            identifier: Math.random().toString(36).substr(2, 10),
        });
    }
}
