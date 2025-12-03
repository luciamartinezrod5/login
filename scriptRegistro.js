function obtenerValores() {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const contraseña1 = document.getElementById("contraseña1").value;
    const contraseña2 = document.getElementById("contraseña2").value;

    if (contraseña1 !== contraseña2) {
        error("Las contraseñas no coinciden.");
        return null;
    }

    if (!nombre || !email || !contraseña1) {
        error("Todos los campos son obligatorios.");
        return null;
    }

    return { nombre, email, password: contraseña1 };
}

async function registrarUsuario() {
    const datos = obtenerValores();
    if (!datos) return; // Corta la funcion si no hay datos 

    // Enviar datos al backend
    const respuesta = await fetch("http://localhost:3000/registro", { // Await espera a que el servidor responda
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos) // aca van los datos que se envian...
    });

    const resultado = await respuesta.json(); // El servidor responde con un JSON
 
    if (resultado.ok) {
        alert("Usuario registrado con éxito!"); // Exito (si se registró)
    } else {
        error(resultado.error); // Error (no se registró)
    }
}
