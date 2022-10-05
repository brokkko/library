let deleteButtonsCollection = document.getElementsByClassName('deleteButton');
let deleteButtonsArray = Array.from(deleteButtonsCollection);

deleteButtonsArray.forEach((button) => {
    button.onclick = (e) => {
        console.log("CLICKED")
        e.preventDefault();
        console.log(button.data("id"));
    }
})