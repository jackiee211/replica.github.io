const inputs = document.querySelectorAll("input");
const btnLogIn = document.getElementById("signinFormBtn");
const formData = document.querySelector("form");
const msg = document.getElementById("errMsg");

let userData = [];

let isValid = false;

if (sessionStorage.getItem('userEmail') != null) { {
    location.href = "./home.html";
}
};
if (JSON.parse(localStorage.getItem('userInfo')) != null) {
    userData = JSON.parse(localStorage.getItem('userInfo'));
    // console.log(userData)
}

// EVENT
formData.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isValid) {
        logInUser(inputs[0].value, inputs[1].value);
    }
})

//sign IN
formData.addEventListener("input", function () {
    if (validationEmail() && validationPassword()) {
        isValid = true;
    } else {
        isValid = false;
    }
})

function logInUser(email, password) {
    const user = userData.find(user => user.email === email && user.password === password);

    if (user) {
        const username = email.split('@')[0]
        sessionStorage.setItem('userEmail', user.email);
        sessionStorage.setItem('userPassword', user.password);
        sessionStorage.setItem('userName', username);
        location.href = "./home.html";
    } else {
        const notFound = document.createElement("p");
        notFound.classList.add("text-danger");
        notFound.textContent = "Invalid email or password.";
        msg.appendChild(notFound);
    }
}
function showErrorMessage(message) {
    msg.innerHTML = '';
    const notFound = document.createElement("p");
    notFound.classList.add("text-danger");
    notFound.textContent = message;
    msg.appendChild(notFound);
}

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
