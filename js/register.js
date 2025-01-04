const inputs = document.querySelectorAll("input");
const btnRegister = document.getElementById("btnRegister");
const formData = document.querySelector("form");
const error = document.getElementById("existMsg");

let userData = [];

if (localStorage.getItem('userInfo') !== null) {
    userData = JSON.parse(localStorage.getItem('userInfo'));
}

let isValid = false;

if (sessionStorage.getItem('userEmail') != null) {
    location.replace("./home.html");
}
                                                  
document.forms[0].addEventListener('submit', (event) => {
    event.preventDefault();

    if (isValid) {
        if (emailExists(inputs[0].value)) {
            let existMsg = document.createElement('p');
            existMsg.classList.add('text-danger');
            existMsg.textContent = "This email already exists.";
            error.appendChild(existMsg);
        } else {
            getUserInfo();
            location.href = './index.html';
        }
    } else {
        alert("Please fill in all fields correctly.");
    }
});

formData.addEventListener("input", function () {
    if (validationEmail()
        && validationPassword()) {

        isValid = true;

    } else {
        isValid = false;
    }
});

function getUserInfo() {
    let userInformation = {
        email: inputs[0].value,
        password: inputs[1].value
    };
    
    userData.push(userInformation);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    console.log(userData);
}

function emailExists(email) {
    return userData.some(user => user.email === email);
}

//-----------------------------------> Validation <------------------------------------

// Validate email input
function validationEmail() {
    let regEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regEmail.test(inputs[0].value)) {
        inputs[0].classList.add("is-valid");
        inputs[0].classList.remove("is-invalid");
        return true;
    } else {
        inputs[0].classList.add("is-invalid");
        inputs[0].classList.remove("is-valid");
        return false;
    }
}

function validationPassword() {
    let regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (regPassword.test(inputs[1].value)) {
        inputs[1].classList.add("is-valid");
        inputs[1].classList.remove("is-invalid");
        return true;
    } else {
        inputs[1].classList.add("is-invalid");
        inputs[1].classList.remove("is-valid");
        return false;
    }
}
