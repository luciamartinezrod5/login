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
}

function mostrarPreview(input, previewId) {
  const file = input.files[0];
  const preview = document.getElementById(previewId);

  if (!file) {
    preview.src = "";
    preview.classList.add("d-none");
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    preview.src = e.target.result;
    preview.classList.remove("d-none");
  };
  reader.readAsDataURL(file);
}

async function mostrarMaquinas() {
    try {
        const resp = await fetch("http://localhost:3000/maquinas");
        const maquinas = await resp.json();

        const contenedor = document.getElementById("listaMaquinas");
        contenedor.innerHTML = "";

        maquinas.forEach(m => {
            contenedor.innerHTML += `
                <div class="col-md-3 col-sm-6 mb-4">
                    <div class="card shadow-sm" style="border-radius: 10px;">
                        
                        <div class="ratio ratio-1x1">
                            <img src="http://localhost:3000${m.imagen}"
                                 class="card-img-top img-fluid rounded"
                                 style="object-fit: cover;"
                                 alt="Imagen de ${m.nombre}">
                        </div>

                        <div class="card-body">
                            <h6 class="card-title fw-bold">${m.nombre}</h6>
                            <p class="text-muted mb-1">${m.tipo}</p>
                            <p class="small">${m.descripcion}</p>
                        </div>
                    </div>
                </div>
            `;
        });

    } catch (err) {
        console.error("Error cargando máquinas:", err);
    }
}
