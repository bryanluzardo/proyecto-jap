window.addEventListener("DOMContentLoaded", () => {
  const savedPfp = localStorage.getItem("profilePicture");
  if (savedPfp) {
    document.querySelectorAll(".navbar-icon").forEach((icon) => {
      icon.src = savedPfp;
    });
  }
});
