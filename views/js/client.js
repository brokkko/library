let deleteButtonsCollection = document.getElementsByClassName('deleteButton');
let openButtonsCollection = document.getElementsByClassName('openButton');
const deleteDialog = document.getElementById('delete-dialog');
const cancelDeleteButton = document.getElementById('cancelDeleteButton');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');
let regularCheck = /^[a-zA-Zа-яА-Я]*\s(([a-zA-Zа-яА-Я]*)|([a-zA-Zа-яА-Я]\.))\s(([a-zA-Zа-яА-Я]*)|([a-zA-Zа-яА-Я]\.))$/u;
let regularCheckDate = /^\d{4}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])$/;

let currentButtonId;
Array.from(deleteButtonsCollection).forEach((button) => {
    button.onclick = (e) => {
        currentButtonId = button.getAttribute('data-id');
        if (typeof deleteDialog.showModal === "function") {
            deleteDialog.show();
        }
    }
})

if(confirmDeleteButton !== null) {
    confirmDeleteButton.addEventListener( 'click', (e) => {
        fetch('/library/' + currentButtonId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            window.location.reload();
            return false;
        })
    });
}

if(cancelDeleteButton != null) {
    cancelDeleteButton.addEventListener('close', () => {
        deleteDialog.close();
    });
}


Array.from(openButtonsCollection).forEach((button) => {
    button.onclick = (e) => {
        window.location.href = '/library/' + button.getAttribute('data-id');
    }
})

document.getElementById('logOut').addEventListener('click', (e) => {
    fetch('/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        window.location.reload();
        return false;
    })
})

const author = document.getElementById('add-author');
const title = document.getElementById('add-title');
const release = document.getElementById('add-release');
//
// document.getElementById('add-book-button').addEventListener('click', (e) => {
//     console.log(author.innerText)
//     console.log(title.innerText)
//     console.log(release.innerText)
// })
const addDialog = document.getElementById('add-dialog');
const addBookButton = document.getElementById('add-book-button');
const addCancelButton = document.getElementById('addCancelButton');

document.getElementById('show-add-info-button').addEventListener('click', () => {
    if (typeof addDialog.showModal === "function") {
        addDialog.show();
        setTimeout(() => {
            addDialog.classList.add('show');
        }, 300);
    }
});

if(addBookButton !== null) {
    addBookButton.addEventListener( 'click', (e) => {
        if (!regularCheck.test(author.value)) {
            e.preventDefault();
            author.style.borderColor = "red";
            return
        } if(title.value === ""){
            title.style.borderColor = "red";
            e.preventDefault();
        } if(new Date(release.value) > new Date(new Date().toJSON().slice(0, 10))) {
            release.style.borderColor = "red";
            e.preventDefault();
        } else {
            addDialog.classList.remove('show');
            let tmp = {author: author.value, title: title.value, release: release.value};
            addDialog.close();
            fetch('/library/', {
                method: 'POST',
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
        }
    });
}

if(addCancelButton !== null) {
    addCancelButton.addEventListener('click', () => {
        author.value = "";
        title.value = "";
        release.value = "";
        addDialog.close();
        addDialog.classList.remove('show');
    });
}
