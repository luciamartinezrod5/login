const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());

// Para permitir servir imágenes desde /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "58242",
    database: "mi_app"
});


// ------------------------------------------
// ⚙️ CONFIGURAR MULTER PARA GUARDAR ARCHIVOS
// ------------------------------------------

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/"); // carpeta donde se guardan imágenes
    },
    filename: function(req, file, cb) {
        const nombreFinal = Date.now() + "-" + file.originalname;
        cb(null, nombreFinal); // nombre único
    }
});

const upload = multer({ storage });


// ------------------------------------------
// 🟦 RUTA PARA REGISTRAR USUARIO
// ------------------------------------------

app.use(express.json());

app.post("/registro", (req, res) => {
    const { nombre, email, password } = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";

    db.query(sql, [nombre, email, passwordHash], (err) => {
        if (err) return res.json({ ok: false, error: "Error en la BD: " + err });
        return res.json({ ok: true });
    });
});


// ------------------------------------------
// 🟩 RUTA PARA LOGIN
// ------------------------------------------

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE email = ?";

    db.query(sql, [email], (err, results) => {
        if (err) return res.json({ ok: false, error: "Error en la BD: " + err });

        if (results.length === 0) {
            return res.json({ ok: false, error: "Email no registrado." });
        }

        const usuario = results[0];

        const coincide = bcrypt.compareSync(password, usuario.password);
        if (!coincide) {
            return res.json({ ok: false, error: "Contraseña incorrecta." });
        }

        return res.json({ ok: true, nombre: usuario.nombre });
    });
});


// ------------------------------------------
// 🟨 RUTA PARA CARGAR MÁQUINA CON IMAGEN
// ------------------------------------------

app.post("/cargarMaquina", upload.single("imagen"), (req, res) => {
    const { nombre, descripcion, tipo } = req.body;

    if (!req.file) {
        return res.json({ ok: false, error: "No se recibió la imagen." });
    }

    const rutaImagen = "/uploads/" + req.file.filename;

    const sql = `
        INSERT INTO maquinas (nombre, descripcion, tipo, imagen)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [nombre, descripcion, tipo, rutaImagen], (err) => {
        if (err) return res.json({ ok: false, error: "Error en la BD: " + err });
        return res.json({ ok: true });
    });
});

// ------------------------------------------
// 🟩 MOSTRAR MAQUINAS CARGADAS
// ------------------------------------------

app.get("/maquinas", (req, res) => {
    const sql = "SELECT * FROM maquinas";

    db.query(sql, (err, results) => {
        if (err) {
            return res.json({ ok: false, error: "Error en la BD: " + err });
        }
        res.json(results);
    });
});

// ------------------------------------------
// 🚀 INICIAR SERVIDOR
// ------------------------------------------

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
