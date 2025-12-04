function error(texto) {
    document.getElementById("error").innerHTML =
        `<div class="alert alert-danger">${texto}</div>`;
}

// SOLO PARA PAGINAS PRIVADAS
function requireSession() {
    const usuarioJSON = localStorage.getItem("usuario");

    if (!usuarioJSON) {
        window.location.href = "login.html"; // No hay sesión → redirigir
    } else {
        const usuario = JSON.parse(usuarioJSON);
        document.getElementById("usuario").textContent = usuario.nombre;
    }
}


// SOLO PARA LOGIN Y REGISTRO
function redirectIfLogged() {
    const usuarioJSON = localStorage.getItem("usuario");

    if (usuarioJSON) {
        window.location.href = "home.html"; // Ya hay sesión → no mostrar login/registro
    }
}


    function cerrarSesion() {
        localStorage.removeItem("usuario");
        window.location.href = "login.html";
    }