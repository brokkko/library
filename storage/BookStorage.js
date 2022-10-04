import fs from 'fs';
/* ---- book profile ----
* Author: String
* Title: String
* Release: Date
* Available: boolean
* Current user: String / ""
* Return Date: Date */

export default class BookStorage {

    constructor() {
        let jsonBooks = this.#loadJSON('./bookStorage.json');
        this.books = []
        for(let i in jsonBooks)
            this.books.push(jsonBooks[i]);
    }

    #loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

    #updateBookStorage = () => {
        const jsonContent = JSON.stringify(this.books);
        // console.log(jsonContent)
        fs.writeFile("./storage/bookStorage.json", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log(err);
            }
        });
    }

    addBook = (author, title, release) => {
        // this.books.push({
        //     // id: "id" + Math.random().toString(16).slice(2),
        //     author: author,
        //     title: title,
        //     release: release,
        //     available: true,
        //     currentUser: "",
        //     returnDate: ""
        // })
        // //console.log(this.books);
        // this.#updateBookStorage();
        console.log("book storage")
    }

}