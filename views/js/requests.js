let deleteButtonsCollection = document.getElementsByClassName('deleteButton');
let deleteButtonsArray = Array.from(deleteButtonsCollection);

// var request = require('request');
// function updateClient(postData){
//     var clientServerOptions = {
//         uri: 'http://'+clientHost+''+clientContext,
//         body: JSON.stringify(postData),
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
//     request(clientServerOptions, function (error, response) {
//         console.log(error,response.body);
//         return;
//     });
// }



deleteButtonsArray.forEach((button) => {
    button.onclick = (e) => {
        console.log("CLICKED")
        console.log(button)
        console.log(button.getAttribute('data-id'));
        fetch('/library/' + button.getAttribute('data-id'), {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            window.location.reload();
            return false;
        })

    }
})