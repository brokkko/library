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
        fs.writeFileSync('./storage/bookStorage.json', JSON.stringify(this.books));
    }

    getById = (id) => {
        let book;
        this.books.forEach((elem) => {
            if(elem.id === id)
                book = elem;
        })
        return book;
    }

    addBook = (author, title, release, status = true, currentUser = "",
               returnDate = "", id = "id" + Math.random().toString(16).slice(2)) => {
        this.books.push({
            id: id,
            author: author,
            title: title,
            release: release,
            available: status,
            currentUser: currentUser,
            returnDate: returnDate
        })
        this.#updateBookStorage();
    }

    updateBook = (id, fieldName, updatedInfo) => {
        let book = this.getById(id);
        switch (fieldName) {
            case "author": book.author = updatedInfo; break;
            case "title": book.title = updatedInfo; break;
            case "release": book.release = updatedInfo; break;
            case "available": book.available = updatedInfo; break;
            case "currentUser": book.currentUser = updatedInfo; break;
            case "returnDate": book.returnDate = updatedInfo.toString(); break;
        }
        this.deleteById(id);
        this.addBook(book.author, book.title, book.release, book.available, book.currentUser, book.returnDate, book.id);
    }

    deleteById = (id) => {
        let index = this.books.indexOf(this.getById(id));
        if (index !== -1) {
            this.books.splice(index, 1);
        }
        this.#updateBookStorage();
    }

    getAllOverdue = () => {
        let result = [];
        this.books.sort(function(a,b){
            return new Date(a.returnDate) - new Date(b.returnDate);
        });
        this.books.forEach((elem) => {
            if(elem.available === false && (new Date(elem.returnDate) < new Date(new Date().toJSON().slice(0, 10)))) {
                result.push(elem);
            }
        })
        return result;
    }

    getAllSortedByReturnDate = () => {
        let result = [];
        this.books.sort(function(a,b){
            return new Date(a.returnDate) - new Date(b.returnDate);
        });
        this.books.forEach((elem) => {
            if(elem.available === false) {
                result.push(elem);
            }
        })
        return result;
    }

    getAllInStock = () => {
        let result = [];
        this.books.forEach((elem) => {
            if(elem.available === true) {
                result.push(elem);
            }
        })
        return result;
    }

}