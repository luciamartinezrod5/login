// abrir la terminal en CMD
// npm init -y
// npm install express
// npm install mysql2
// npm install express mysql2 cors

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",     // tu usuario
    password: "58242",     // tu contraseña de MySQL
    database: "mi_app"  // la base que creaste
});

// Ruta para registrar usuario
app.post("/registro", (req, res) => {
    console.log("Datos recibidos del frontend:", req.body);  // muestra en consola para comprobar que ande bien

    const { nombre, email, password } = req.body; // recupera los datos que se enviaron en scriptRegistro.js

    const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)"; // sentencia sql para agregar un usuario

    db.query(sql, [nombre, email, password], (err, result) => {
        if (err) {
            return res.json({ ok: false, error: "Error en la BD: " + err }); // si hay un err (error) devuelve ok -> false y error -> Error en la bd..
        }
        return res.json({ ok: true }); // devuelve ok -> True
    });
});




// Ruta para login
app.post("/login", (req, res) => {
    console.log("Login recibido:", req.body);

    const { email, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE email = ?"; // sentencia para buscar usuarios con el email ingresado

    db.query(sql, [email], (err, results) => {
        if (err) return res.json({ ok: false, error: "Error en la BD: " + err }); // error en la bd

        if (results.length === 0) {
            return res.json({ ok: false, error: "Email no registrado." }); // no encontró el email en la bd
        }

        const usuario = results[0]; // si encuentra el email el primer elemento del array será un objeto usuario

        if (usuario.password !== password) { // verifica si la contraseña del obj usuario encontrado es distinta a la ingresada
            return res.json({ ok: false, error: "Contraseña incorrecta." }); // error de contraseña diferente
        }

        return res.json({ ok: true, nombre: usuario.nombre }); // la contraseña coincide e inicia la sesion
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000"); 
});

// node server.js -> en la terminal cada vez que se modifique este archivo