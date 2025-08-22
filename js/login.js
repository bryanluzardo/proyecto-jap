// aquí comienza el redirect al home luego de realizar un login exitoso
function redirectToHome() {

    localStorage.setItem("loggedIn", "true");

    //divido la función en dos partes, una que redirija, la parte principal, pero la primera es la que se asegura que los datos queden guardados.

    window.location.href = "index.html";
}

const btnLogin = document.getElementById("btn-login");
if (btnLogin) {
    btnLogin.addEventListener("click", redirectToHome);
}

//js para el toggle de password

const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.addEventListener("click", function(){

    if (password.type === "password") {

        //esto es para mostrarla si está oculta
        password.type = "text";

        //y aquí es para cambiar el icono.

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
        
    } else{
        password.type = "password";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    }
})