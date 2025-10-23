// const newPfp = document.getElementById("newPfp");
// const profilePicture = document.getElementById("profile-picture");
// const uploadPfp = document.getElementById("uploadPfp");

//previsualización de la pfp antes de subirla

// newPfp.addEventListener("change", () => {
//  const archive = newPfp.files[0];

//  if (archive) {
//    const reader = new FileReader();

//    reader.onload = function (event) {
//      profilePicture.src = event.target.result;
//    };
//    reader.readAsDataURL(archive);
//  }
//});

//esto es para subir la pfp

//uploadPfp.addEventListener("click", () => {
//  const archive = newPfp.files[0];
//  if (!archive) {
//    alert("Por favor elija una imagen primero.");
//    return;
//  }

//  const reader = new FileReader();
//  reader.onload = function (event) {
//    const base64image = event.target.result;
//    localStorage.setItem("profilePicture", base64image);

//    profilePicture.src = base64image;

// Actualizar el ícono del navbar
//    const navbarIcon = document.getElementsByClassName(".navbar-icon");
//    navbarIcon.src = base64image;

//    alert("¡Foto de perfil actualizada con éxito!");
//  };
//  reader.readAsDataURL(archive);
//});

//esto es para que persista al cargar la página

// window.addEventListener("load", () => {
//  const savedPfp = localStorage.getItem("profilePicture");

//  if (savedPfp) {
//    profilePicture.src = savedPfp;
//  }
//});

// Código para el popup de editar datos de perfil

const showPopup = document.getElementById("ShowPopup");
const popup = document.getElementById("popup");

if (showPopup && popup) {
  showPopup.addEventListener("click", () => {
    popup.style.display = "flex";
  });
}

const form = document.querySelector("form");

// Elementos de la tarjeta

const nombreApellidoP = document.querySelector(".info-card:nth-of-type(1) p");
const emailA = document.querySelector(".info-card:nth-of-type(2) a");
const telefonoP = document.querySelector(".info-card:nth-of-type(3) p");

// Inputs del formulario

const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputEmail = document.getElementById("email");
const inputTelefono = document.getElementById("telefono");

// Al enviar el formulario

form.addEventListener("submit", (e) => {
  e.preventDefault(); // evita recarga

  // Guardar en localStorage

  const nombre = inputNombre.value;
  const apellido = inputApellido.value;
  const email = inputEmail.value;
  const telefono = inputTelefono.value;

  localStorage.setItem("nombre", nombre);
  localStorage.setItem("apellido", apellido);
  localStorage.setItem("email", email);
  localStorage.setItem("telefono", telefono);

  // Actualizar la tarjeta

  nombreApellidoP.textContent = `${nombre} ${apellido}`;
  emailA.textContent = email;
  emailA.href = `mailto:${email}`;
  telefonoP.textContent = `+598 ${telefono}`;

  // Cerrar popup

  popup.style.display = "none";

  alert("Datos actualizados con éxito!");
});

// Al cargar la página, rellenar los inputs y tarjeta con lo guardado

window.addEventListener("DOMContentLoaded", () => {
  // Inputs del formulario
  const inputNombre = document.getElementById("nombre");
  const inputApellido = document.getElementById("apellido");
  const inputEmail = document.getElementById("email");
  const inputTelefono = document.getElementById("telefono");

  // Elementos de la tarjeta
  const nombreApellidoP = document.querySelector(".info-card:nth-of-type(1) p");
  const emailA = document.querySelector(".info-card:nth-of-type(2) a");
  const telefonoP = document.querySelector(".info-card:nth-of-type(3) p");

  // Foto de perfil
  const profilePicture = document.getElementById("profile-picture");
  const navbarIcons = document.querySelectorAll(".navbar-icon");

  // ✅ Cargar datos guardados
  const savedNombre = localStorage.getItem("nombre") || "";
  const savedApellido = localStorage.getItem("apellido") || "";
  const savedEmail =
    localStorage.getItem("email") || localStorage.getItem("username") || "";
  const savedTelefono = localStorage.getItem("telefono") || "";
  const savedPfp = localStorage.getItem("profilePicture");

  // Completar formulario
  inputNombre.value = savedNombre;
  inputApellido.value = savedApellido;
  inputEmail.value = savedEmail;
  inputTelefono.value = savedTelefono;

  // Completar tarjeta
  nombreApellidoP.textContent = `${savedNombre} ${savedApellido}`;
  emailA.textContent = savedEmail;
  emailA.href = `mailto:${savedEmail}`;
  telefonoP.textContent = savedTelefono ? `+598 ${savedTelefono}` : "+598";

  // Completar foto
  if (savedPfp) {
    if (profilePicture) profilePicture.src = savedPfp;
    navbarIcons.forEach((icon) => (icon.src = savedPfp));
  }

  // Previsualizar y actualizar foto
  const newPfp = document.getElementById("newPfp");
  const uploadPfp = document.getElementById("uploadPfp");

  newPfp?.addEventListener("change", () => {
    const archive = newPfp.files[0];
    if (archive) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = e.target.result;
        if (profilePicture) profilePicture.src = img;
        navbarIcons.forEach((icon) => (icon.src = img));
      };
      reader.readAsDataURL(archive);
    }
  });

  uploadPfp?.addEventListener("click", () => {
    const archive = newPfp.files[0];
    if (!archive) return alert("Por favor elija una imagen primero.");

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64image = e.target.result;
      localStorage.setItem("profilePicture", base64image);

      if (profilePicture) profilePicture.src = base64image;
      navbarIcons.forEach((icon) => (icon.src = base64image));

      alert("¡Foto de perfil actualizada con éxito!");
    };
    reader.readAsDataURL(archive);
  });
});
