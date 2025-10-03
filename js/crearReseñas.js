import { getReviews } from "./utils.js";

export async function crearResenia() {
  const productId = window.localStorage.getItem("currentProductID");
  
  // Crear contenedor principal
  const contenedorResenias = document.createElement("div");
  contenedorResenias.classList.add("contenedor-reseñas");

  // ===== Formulario para crear reseña =====
  const calificaciones = document.createElement("div");
  calificaciones.classList.add("calificaciones");

  // //espacio para escribir el comentario
  const comentario = document.createElement("textarea");
  comentario.placeholder = "Escriba su reseña aquí...";
  comentario.classList.add("comentar-resenia");
  //agregué esto para poder darle estilos en css

  const estrellasContainer = document.createElement("div");
  estrellasContainer.classList.add("estrellas-container");

  let rating = 0;

  // Crear estrellas
  for (let i = 1; i <= 5; i++) {
    const estrella = document.createElement("span");
    estrella.classList.add("estrella");
    estrella.textContent = "☆";
    estrella.dataset.value = i;

    estrella.addEventListener("mouseover", () => pintarEstrellas(i));
    estrella.addEventListener("mouseout", () => pintarEstrellas(rating));
    estrella.addEventListener("click", () => {
      rating = i;
      pintarEstrellas(rating);
    });

    estrellasContainer.appendChild(estrella);
  }

  function pintarEstrellas(n) {
    const estrellas = estrellasContainer.querySelectorAll(".estrella");
    estrellas.forEach((e, index) => {
      e.textContent = index < n ? "★" : "☆";
    });
  }

  const enviar = document.createElement("button");
  enviar.textContent = "Enviar";

  calificaciones.appendChild(comentario);
  calificaciones.appendChild(estrellasContainer);
  calificaciones.appendChild(enviar);

  // ===== Lista de reseñas =====
  const listaResenas = document.createElement("div");
  listaResenas.classList.add("lista-resenas");

  const usuarioResenas = localStorage.getItem("username") || "Invitado";

  // Mostrar una reseña
  function mostrarResena(r) {
    const div = document.createElement("div");
    div.classList.add("resena");

    div.innerHTML = `
      <div class="resena-header">
        <img src="${r.foto || "https://avatar.iran.liara.run/public"}" alt="foto de ${r.user}">
        <div>
          <p class="resena-nombre"><strong>${r.user}</strong></p>
          <div class="resena-estrellas">${"★".repeat(r.score)}</div>
        </div>
      </div>
    </div>
            <p class="resena-fecha"><em>${r.fechaHora}</em></p>
</div>
    <p class="resena-mensaje">${r.mensaje}</p>
  `;
    //ahí arriba metí mano para poner la foto de perfil, además de mover donde se ubicaban las estrellas, nombre y fecha.

    // Mostrar botón eliminar si el autor es el usuario actual
    if (r.user === usuarioResenas) {
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "X";
      botonEliminar.classList.add("eliminar");
      botonEliminar.addEventListener("click", () => eliminarResena(r.id));
      div.appendChild(botonEliminar);
    }

    listaResenas.appendChild(div);
  }

  // Guardar reseña en localStorage
  function guardarResena(r) {
  let todas = JSON.parse(localStorage.getItem("reseñas")) || {};
  if (!todas[productId]) todas[productId] = [];
  todas[productId].push(r);
  localStorage.setItem("reseñas", JSON.stringify(todas));
}

  // Cargar todas las reseñas guardadas
  async function cargarResenas() {
    listaResenas.innerHTML = "";
    const apiReviews = await getReviews(productId)
    apiReviews.forEach((r) => {
      r.user = r.user.replace("_", " ");
      mostrarResena(r);
    });
    let allReviews = JSON.parse(localStorage.getItem("reseñas")) || [];
    let localReviews = allReviews[productId] || [];
    // Asegurar que todas tengan ID
    const checkForID = (reviews) => reviews.map((r) => {
      if (!r.id) r.id = Date.now() + Math.random();
      return r;
    });
    
    checkForID(apiReviews);
    checkForID(localReviews);

    allReviews[productId] = localReviews;

    localStorage.setItem("reseñas", JSON.stringify(allReviews));
    localReviews.forEach((r) => mostrarResena(r));
  }

  // Eliminar reseña
  function eliminarResena(id) {
    let reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];
    reseñas = reseñas.filter((r) => r.id !== id);
    localStorage.setItem("reseñas", JSON.stringify(reseñas));
    cargarResenas();
  }

  // Evento al enviar reseña
  enviar.addEventListener("click", () => {
    const mensaje = comentario.value.trim();
    if (!mensaje) return alert("Por favor escriba una reseña");
    if (rating === 0) return alert("Seleccione una calificación con estrellas");

    const nuevaResena = {
      description: mensaje,
      score: rating,
      user: usuarioResenas,
      dateTime: new Date().toLocaleString(),
      id: Date.now() + Math.random(),
      product: window.localStorage.getItem("currentProduct"),
    };

    guardarResena(nuevaResena);
    mostrarResena(nuevaResena);

    comentario.value = "";
    rating = 0;
    pintarEstrellas(0);
  });

  // Cargar reseñas al inicio
  cargarResenas();

  contenedorResenias.appendChild(calificaciones);
  contenedorResenias.appendChild(listaResenas);

  return contenedorResenias;
}
