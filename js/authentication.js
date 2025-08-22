//para verificar si hay una sesión activa
const closeSession = document.querySelector("#cerrar-sesion")

if (localStorage.getItem('loggedIn') !== 'true') {

//Si no existe una sesión activa, a continuación redirigimos al usuario a la página de login

window.location.href = "login.html";
}

closeSession.addEventListener("click", cerrarSesion)

function cerrarSesion() {
      localStorage.clear("loggedIn")
      window.location = "login.html"
}

//Cree este js básicamente para que si la persona no está conectada no le permita acceder a otras zonas al poner en el https el nombre de la zona. 
// Por ejemplo si alguien intenta ir a https://ecommerce.com/my-perfil.html será expulsado si no inicia sesión. 