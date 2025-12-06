function obtenerValores() {
    const nombre = document.getElementById("nombre").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const tipo = document.getElementById("tipo").value;
    const imagen = document.getElementById("imagenInput").files[0]; // archivo real

    // Validaciones simples
    if (!nombre || !descripcion || !tipo) {
        error("Todos los campos son obligatorios.");
        return null;
    }

    if (!imagen) {
        error("Debes seleccionar una imagen.");
        return null;
    }

    // Devuelve los datos listos para FormData

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("tipo", tipo);
    formData.append("imagen", imagen); // SE ENVÍA EL ARCHIVO
    return formData
}

async function cargar() {
    const formData = obtenerValores();
    if (!formData) return; // Corta la funcion si no hay datos 

     const respuesta = await fetch("http://localhost:3000/cargarMaquina", {
        method: "POST",
        body: formData // SIN headers, FormData los pone solo
    });

    const resultado = await respuesta.json();

    if (resultado.ok) {
        alert("Máquina registrada con éxito!");
    } else {
        error(resultado.error);
    }
}