export function MyProfile () {
    return (
        /* html */`
        <div class="container">
        <h1>¡Hola, usuario!</h1>
        <br />
        <div class="card">
          <div class="info-card">
            <h3>Nombre y Apellido</h3>
            <p></p>
          </div>
          <br />
          <div class="info-card">
            <h3>Email</h3>
            <a href="#placeholder"></a>
          </div>
          <br />
          <div class="info-card">
            <h3>Teléfono de contacto</h3>
            <p>+598 </p>
          </div>
        </div>
        <button id="ShowPopup">Editar datos de perfil</button>
        <div id="popup" class="popup">
          <div class="popup-content">
        <form>
         <div class="perfil-image">
          <img id="profile-picture" src="https://avatar.iran.liara.run/public" alt = "Foto de perfil">
         </div>
         <label for="newPfp" class="camera-icon">
         <i class="fa-solid fa-camera"></i>
         </label>
         <div>
           <input type="file" id="newPfp" accept="image/*" hidden>
           <button id = "uploadPfp" class = "check-icon">
           <i class="fa-solid fa-check"></i>
           </button>
          </div>
        <div>
         <label for="nombre">Nombre</label>
         <input type="text" id="nombre" name="nombre"><br><br>
      <label for="apellido">Apellido</label>
      <input type="text" id="apellido" name="apellido"><br><br>
      <label for="email">Email</label>
      <input type="email" id="email" name="email"><br><br>
      <label for="telefono">Teléfono de contacto</label>
      <input type="tel" id="telefono" name="telefono">
    </div>
    <button type="submit">Actualizar</button>
      </div>
    </div>
  </form>
  </div>
</div>
      </div>
        `
    )
}