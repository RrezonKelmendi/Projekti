document.addEventListener("DOMContentLoaded", function () {

    const loginBox = document.getElementById("loginBox");
    const signupBox = document.getElementById("signupBox");
    const showSignup = document.getElementById("showSignup");
    const showLogin = document.getElementById("showLogin");
    const signupForm = document.getElementById("signupForm");

   
    showSignup.addEventListener("click", function (e) {
        e.preventDefault();
        loginBox.style.display = "none";
        signupBox.style.display = "block";
    });

    
    showLogin.addEventListener("click", function (e) {
        e.preventDefault();
        signupBox.style.display = "none";
        loginBox.style.display = "block";
    });

    
    signupForm.addEventListener("submit", function (e) {
        const password = document.getElementById("signupPassword").value;
        const confirm = document.getElementById("signupConfirmPassword").value;

        if (password !== confirm) {
            e.preventDefault();
            alert("Fjalëkalimet nuk përputhen!");
        }
    });

});