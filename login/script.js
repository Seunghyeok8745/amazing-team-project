userId.addEventListener("focus", function (){userId.value = ""});
password.addEventListener("focus", function (){password.value = ""});

function login() {
    const userId = document.getElementById("userId");
    const password = document.getElementById("password");

    if (userId.value === "" || password.value === "") {
        alert("Please provide your login details to access your account.");
        loginErrorMsg.style.opacity = 1;
    } else {
        window.location.href = 'http://localhost:8888/main/index.html';
    }
}
