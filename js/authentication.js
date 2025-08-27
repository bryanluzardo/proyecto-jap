//para verificar si hay una sesión activa
const closeSession = document.querySelector("#cerrar-sesion")
//agarrar el nombre de usuario
const usuario = localStorage.getItem("username")

if (localStorage.getItem('loggedIn') !== 'true') {

//Si no existe una sesión activa, a continuación redirigimos al usuario a la página de login

window.location.href = "login.html";
}

closeSession.addEventListener("click", cerrarSesion)

function cerrarSesion() {
      window.localStorage.clear("loggedIn")
      window.location = "login.html"
}

//para mostrar usuario
function mostrarUsuario (usuario){
    const li = document.querySelector("#usuario")
    li.innerText = usuario
}

mostrarUsuario(usuario)

//Cree este js básicamente para que si la persona no está conectada no le permita acceder a otras zonas al poner en el https el nombre de la zona. 
// Por ejemplo si alguien intenta ir a https://ecommerce.com/my-perfil.html será expulsado si no inicia sesión. 