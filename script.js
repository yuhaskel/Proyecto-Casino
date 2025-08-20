// Reproduce la música cuando el usuario interactúe
const music = document.getElementById("bg-music");
const btn = document.getElementById("enterBtn");

btn.addEventListener("click", () => {
    // Activa la música
    if (music.paused) {
        music.play().catch(err => console.log("El navegador bloqueó la reproducción automática"));
    }
    // Redirige a la siguiente pantalla
    window.location.href = "menu.html"; 
});
