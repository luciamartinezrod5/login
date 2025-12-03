function obtenerValores() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        error("Todos los campos son obligatorios.");
        return null;
    }

    return { email, password: password };
}



async function login() {
    const datos = obtenerValores();
    if (!datos) return; // Corta la funcion si no hay datos 

    // Enviar datos al backend
    const respuesta = await fetch("http://localhost:3000/login", { // Await espera a que el servidor responda
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos) // aca van los datos que se envian...
    });

    const resultado = await respuesta.json(); // El servidor responde con un JSON
 
    if (resultado.ok) {
        // Guardar datos del usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify({
            nombre: resultado.nombre,
            email: datos.email
        }));

        // Redirigir
        window.location.href = "home.html";
    } else {
        error(resultado.error); // Error (no pudo iniciar sesión)
    }
}