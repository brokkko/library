const getBookButton = document.getElementById('getBookButton');
const userDialog = document.getElementById('user-dialog');
const confirmBtn = document.getElementById('confirmBtn');
const cancelButton = document.getElementById('cancelButton');
let bookUserName = document.getElementById('book-user-name');
let returnDate = document.getElementById('return-date');

let returnBookButton = document.getElementById('returnBookButton')

if(getBookButton !== null) {
    getBookButton.addEventListener('click', () => {
        if (typeof userDialog.showModal === "function") {
            userDialog.show();
        }
    });
    document.querySelectorAll("[contenteditable=true]").forEach(el => el.setAttribute("contentEditable", true))
}

if(confirmBtn !== null) {
    confirmBtn.addEventListener( 'click', (e) => {
        if (bookUserName.value === "" || returnDate.value === "")
            e.preventDefault();
        else {
            let tmp = {currentUser: bookUserName.value, returnDate: returnDate.value, available: false};
            userDialog.close();
            fetch('/library/' + getBookButton.getAttribute('data-id'), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tmp)
            }).then((response) => {
                // console.log(response)
                if(response.ok) {
                    window.location.reload();
                }
                return false;
            })
        }
    });
}

if(cancelButton !== null) {
    cancelButton.addEventListener('close', () => {
        userDialog.close();
    });
}

if (returnBookButton !== null) {
    returnBookButton.addEventListener('click', (e) => {
        let tmp = {currentUser: "", returnDate: "", available: true};
        fetch('/library/' + returnBookButton.getAttribute('data-id'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tmp)
        }).then((response) => {
            if(response.ok) {
                window.location.reload();
            }
            return false;
        })
    })
    document.querySelectorAll("[contenteditable=true]").forEach(el => el.setAttribute("contentEditable", false))
}

const authorEditor = document.getElementById('author-editor');
const titleEditor = document.getElementById('title-editor');
const releaseEditor = document.getElementById('release-editor');

if(authorEditor !== null && titleEditor !== null && releaseEditor !== null) {
    authorEditor.addEventListener('focusout', (event) => {
        event.target.style.background = 'gray';
        let tmp = {author: authorEditor.innerText};
        fetch('/library/' + getBookButton.getAttribute('data-id'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tmp)
        }).then((response) => {
            if(response.ok) {
                window.location.reload();
            }
            return false;
        })
    });
}


