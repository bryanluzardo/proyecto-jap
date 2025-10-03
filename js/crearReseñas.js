export function crearResenia() {
  //espacio para poder realizar una calificación
  const calificaciones = document.createElement("div");
  calificaciones.classList.add("calificaciones");

  //espacio para escribir el comentario
  const comentario = document.createElement("textarea");
  comentario.placeholder = "Escriba su reseña aquí...";

  const estrellasContainer = document.createElement("div");
  estrellasContainer.classList.add("estrellas-container");

  let rating = 0;

  for (let i = 1; i <= 5; i++) {
    const estrella = document.createElement("span");
    estrella.classList.add("estrella");
    estrella.textContent = "☆";
    estrella.dataset.value = i;

    estrella.addEventListener("mouseover", () => {
      pintarEstrellas(i);
    });

    estrella.addEventListener("mouseout", () => {
      pintarEstrellas(rating);
    });

    // click: setear rating
    estrella.addEventListener("click", () => {
      rating = i;
      pintarEstrellas(rating);
    });

    estrellasContainer.appendChild(estrella);
  }

  function pintarEstrellas(n) {
    const estrellas = estrellasContainer.querySelectorAll(".estrella");
    estrellas.forEach((e, index) => {
      if (index < n) {
        e.textContent = "★";
      } else {
        e.textContent = "☆";
      }
    });
  }

  //botón de enviar
  const enviar = document.createElement("button");
  enviar.textContent = "enviar";

  calificaciones.appendChild(comentario);
  calificaciones.appendChild(estrellasContainer);
  calificaciones.appendChild(enviar);

  //hacer que cada reseña se suba y que quede en forma de lista abajo del espacio para hacer una reseña
  const listaResenas = document.createElement("div");
  listaResenas.classList.add("lista-resenas");

  let usuarioResenas = localStorage.getItem("username") || "Invitado";

  function mostrarResena(r) {
    const div = document.createElement("div");
    div.classList.add("resena");
    div.innerHTML = `
    <div class="resena-header">
      <img src="${
        r.foto || "https://avatar.iran.liara.run/public"
      }" alt="foto de ${r.autor}">
      <div>
        <p class="resena-nombre"><strong>${r.autor}</strong></p>
        <div class="resena-estrellas">${"★".repeat(r.rating)}</div>
      </div>
    </div>
            <p class="resena-fecha"><em>${r.fechaHora}</em></p>
</div>
    <p class="resena-mensaje">${r.mensaje}</p>
  `;

    if (r.autor === usuario) {
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "X";
      botonEliminar.classList.add("eliminar");
      botonEliminar.addEventListener("click", () => eliminarResena(r.id));
      div.appendChild(botonEliminar);
    }

    listaResenas.appendChild(div);
  }

  function guardarResena(r) {
    let reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];
    reseñas.push(r);
    localStorage.setItem("reseñas", JSON.stringify(reseñas));
  }

  function cargarResenas() {
    listaResenas.innerHTML = "";
    let reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];

    reseñas = reseñas.map((r) => {
      if (!r.id) r.id = Date.now() + Math.random();
      return r;
    });
    localStorage.setItem("reseñas", JSON.stringify(reseñas));

    reseñas.forEach((r) => mostrarResena(r));
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

    const r = {
      mensaje,
      rating,
      autor: usuario,
      fechaHora: new Date().toLocaleString(),
      id: Date.now() + Math.random(),
    };

    guardarResena(r);
    mostrarResena(r);

    comentario.value = "";
    rating = 0;
    pintarEstrellas(0);
  });

  // Cargar reseñas al inicio
  cargarResenas();

  const contenedorResenias = document.createElement("div");
  contenedorResenias.classList.add("contenedor-reseñas");

  contenedorResenias.appendChild(calificaciones);
  contenedorResenias.appendChild(listaResenas);

  return contenedorResenias;
}
