const newPfp = document.getElementById("newPfp");
const profilePicture = document.getElementById("profile-picture");
const uploadPfp = document.getElementById("uploadPfp");

//previsualización de la pfp antes de subirla

newPfp.addEventListener('change', () => {

const archive = newPfp.files[0];

if (archive){
    const reader = new FileReader();
     
        reader.onload = function(event) {
            profilePicture.src = event.target.result;
        };
        reader.readAsDataURL(archive);
    }
});

//esto es para subir la pfp

uploadPfp.addEventListener('click', () => {
    const archive = newPfp.files[0];
    if (!archive){
        alert("Por favor elija una imagen primero.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const base64image = event.target.result;
        localStorage.setItem("profilePicture", base64image);
        alert("¡Foto de perfil actualizada con éxito!");
    }
    reader.readAsDataURL(archive);}
);

//esto es para que persista al cargar la página 

window.addEventListener('load', () => {
    const savedPfp = localStorage.getItem("profilePicture");
     
    if (savedPfp){
        profilePicture.src = savedPfp;
    }})
