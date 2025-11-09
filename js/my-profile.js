// my-profile.js
export function initProfileScript() {
  // --- Elementos del DOM (todos protegidos) ---
  const showPopup = document.getElementById("ShowPopup");
  const popup = document.getElementById("popup");
  const popupClose = document.getElementById("popup-close"); // opcional botón cerrar dentro del popup
  const form = document.querySelector("form");

  const nombreApellidoP = document.querySelector(".info-card:nth-of-type(1) p");
  const emailA = document.querySelector(".info-card:nth-of-type(2) a");
  const telefonoP = document.querySelector(".info-card:nth-of-type(3) p");

  const inputNombre = document.getElementById("nombre");
  const inputApellido = document.getElementById("apellido");
  const inputEmail = document.getElementById("email");
  const inputTelefono = document.getElementById("telefono");

  const profilePicture = document.getElementById("profile-picture");
  const navbarIcons = document.querySelectorAll(".navbar-icon");

  const newPfp = document.getElementById("newPfp");
  const uploadPfp = document.getElementById("uploadPfp");

  // --- Helpers seguros ---
  const safeSetText = (el, text) => { if (el) el.textContent = text ?? ""; };
  const safeSetHref = (el, href) => { if (el) el.href = href ?? "#"; };
  const setNavbarIconsSrc = (src) => {
    if (!src) return;
    if (navbarIcons && navbarIcons.length) {
      navbarIcons.forEach(icon => {
        try { icon.src = src; } catch (err) { /* noop */ }
      });
    }
  };

  // --- Cargar datos guardados ---
  const savedNombre = localStorage.getItem("nombre") || "";
  const savedApellido = localStorage.getItem("apellido") || "";
  const savedEmail = localStorage.getItem("email") || localStorage.getItem("username") || "";
  const savedTelefono = localStorage.getItem("telefono") || "";
  const savedPfp = localStorage.getItem("profilePicture") || "";

  // Rellenar inputs si existen
  if (inputNombre) inputNombre.value = savedNombre;
  if (inputApellido) inputApellido.value = savedApellido;
  if (inputEmail) inputEmail.value = savedEmail;
  if (inputTelefono) inputTelefono.value = savedTelefono;

  // Rellenar tarjeta
  safeSetText(nombreApellidoP, `${savedNombre} ${savedApellido}`.trim());
  if (emailA) {
    emailA.textContent = savedEmail || "";
    emailA.href = savedEmail ? `mailto:${savedEmail}` : "#";
  }
  safeSetText(telefonoP, savedTelefono ? `+598 ${savedTelefono}` : "+598");

  // Foto perfil (tarjeta + navbar)
  if (savedPfp) {
    if (profilePicture) profilePicture.src = savedPfp;
    setNavbarIconsSrc(savedPfp);
  }

  // --- Popup: abrir / cerrar ---
  if (showPopup && popup) {
    showPopup.addEventListener("click", () => {
      popup.style.display = "flex";
    });
  }

  if (popupClose && popup) {
    popupClose.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  // cerrar con ESC
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && popup && popup.style.display === "flex") {
      popup.style.display = "none";
    }
  });

  // cerrar al clickear fuera del contenido del popup
  if (popup) {
    popup.addEventListener("click", (ev) => {
      if (ev.target === popup) popup.style.display = "none";
    });
  }

  // --- Guardar datos del formulario ---
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = inputNombre ? inputNombre.value.trim() : "";
      const apellido = inputApellido ? inputApellido.value.trim() : "";
      const email = inputEmail ? inputEmail.value.trim() : "";
      const telefono = inputTelefono ? inputTelefono.value.trim() : "";

      localStorage.setItem("nombre", nombre);
      localStorage.setItem("apellido", apellido);
      localStorage.setItem("email", email);
      localStorage.setItem("telefono", telefono);

      safeSetText(nombreApellidoP, `${nombre} ${apellido}`.trim());
      if (emailA) {
        emailA.textContent = email;
        emailA.href = email ? `mailto:${email}` : "#";
      }
      safeSetText(telefonoP, telefono ? `+598 ${telefono}` : "+598");

      if (popup) popup.style.display = "none";
      alert("Datos actualizados con éxito!");
    });
  }

  // --- Previsualización de la PFP antes de subir ---
  if (newPfp && profilePicture) {
    newPfp.addEventListener("change", () => {
      const file = newPfp.files && newPfp.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const data = ev.target.result;
        if (profilePicture) profilePicture.src = data;
        setNavbarIconsSrc(data);
      };
      reader.readAsDataURL(file);
    });
  }

  // --- Subir / guardar PFP en localStorage ---
  if (uploadPfp) {
    uploadPfp.addEventListener("click", () => {
      const file = newPfp && newPfp.files && newPfp.files[0];
      if (!file) {
        alert("Por favor elija una imagen primero.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target.result;
        localStorage.setItem("profilePicture", base64);
        if (profilePicture) profilePicture.src = base64;
        setNavbarIconsSrc(base64);
        alert("¡Foto de perfil actualizada con éxito!");
      };
      reader.readAsDataURL(file);
    });
  }
}
