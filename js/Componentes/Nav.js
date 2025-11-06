export function Nav() {
    return (
        /* html */`
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav w-100 justify-content-between">
                <li class="nav-item">
                <a class="nav-link active" href="#/index">Inicio</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#/categories">Categorías</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#/sell">Vender</a>
                </li>
                <li class="nav-item">
                <button
                    id="toggle-theme"
                    class="nav-link btn btn-link"
                    style="cursor: pointer"
                >
                    🌙
                </button>
                </li>
                <li class="nav-item cart-icon">
                
                </li>
                <li class="nav-item nav-link active" style="cursor: pointer">
                <a class="nav-link" href="#/my-profile" id="usuario"
                    >Mi Perfil</a
                >
                </li>
                <li class="nav-item">
                <a class="nav-link" id="usuarioIcon">
                    <img
                    class="navbar-icon"
                    src="https://avatar.iran.liara.run/public"
                    alt="Foto de perfil"
                    style="width: 30px; height: 30px; border-radius: 50%"
                    />
                </a>
                </li>
                <li
                class="nav-item nav-link active"
                id="cerrar-sesion"
                style="cursor: pointer"
                >
              Cerrar sesión
            </li>
          </ul>
        </div>
      `
    )
}