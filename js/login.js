const loginForm = document.getElementById("login-form");
const password = document.getElementById("password");


loginForm.addEventListener("submit", function(e) {
    e.preventDefault(); //esto es para evitar que la página se recarge al hacer click en el botón

    const user = document.getElementById("username").value.trim();
    const pass = password.value.trim(); 

    if (user === "" || pass === "") {
        alert("Por favor completa los campos.");
        return;
    }
 // acá hace el redirect ahora

    localStorage.setItem("loggedIn", "true");
    // para guardar el nombre de usuario o mail
    localStorage.setItem("username", user);
    window.location.href = "index.html";
});

//js para el toggle de password

const togglePassword = document.getElementById("togglePassword");
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

//para cerrar sesión



