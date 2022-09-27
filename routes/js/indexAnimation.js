const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');
const signup = document.querySelector(".signup");
const signin = document.querySelector(".center");
const newUsername = document.getElementById("new-username"),
      newPassword = document.getElementById("new-password"),
      username = document.getElementById("username"),
      password = document.getElementById("password");


loginBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode.parentNode;
    Array.from(e.target.parentNode.parentNode.classList).find((element) => {
        if(element !== "slide-up") {
            parent.classList.add('slide-up')
        }else{
            signupBtn.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    });
});

signupBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode;
    Array.from(e.target.parentNode.classList).find((element) => {
        if(element !== "slide-up") {
            parent.classList.add('slide-up')
        }else{
            loginBtn.parentNode.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    });
});

// // add new user
// signup.onsubmit = (e) => {
//     e.preventDefault();
//     console.log("sign up");
//     console.log(newUsername.value, newPassword.value);
// }
//
// // check exist user
// signin.onsubmit = (e) => {
//     e.preventDefault();
//     console.log("sign in");
//     console.log(username.value, password.value);
// }
