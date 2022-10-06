let deleteButtonsCollection = document.getElementsByClassName('deleteButton');
let openButtonsCollection = document.getElementsByClassName('openButton');
const deleteDialog = document.getElementById('delete-dialog');
const cancelDeleteButton = document.getElementById('cancelDeleteButton');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');

let currentButtonId;
Array.from(deleteButtonsCollection).forEach((button) => {
    button.onclick = (e) => {
        currentButtonId = button.getAttribute('data-id');
        if (typeof deleteDialog.showModal === "function") {
            deleteDialog.show();
        }
    }
})


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

cancelDeleteButton.addEventListener('close', () => {
    deleteDialog.close();
});


Array.from(openButtonsCollection).forEach((button) => {
    button.onclick = (e) => {
        window.location.href = '/library/' + button.getAttribute('data-id');
    }
})

