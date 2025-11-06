if (localStorage.getItem('loggedIn') !== 'true') {
  window.location.href = "login.html";
}

const usuario = localStorage.getItem("username");

function mostrarUsuario(nombre) {
  const li = document.querySelector("#usuario");
  if (!li) return;
  li.innerText = nombre || "Usuario"; 
}

mostrarUsuario(usuario);

document.addEventListener("click", (e) => {
  const target = e.target.closest("#cerrar-sesion");
  if (!target) return; 

  cerrarSesion();
});


function cerrarSesion() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("username");

  window.location.href = "login.html";
}
