import { getDatos, postUser } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector(".login");
  const usuario1 = document.getElementById("usuario");
  const email1 = document.getElementById("email");
  const clave1 = document.getElementById("clave");

  if (!form) {
    console.error("No se encontró el formulario");
    return;
  }

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const nuevoUsuario = {
        usuario: usuario1.value.trim(),
        email: email1.value.trim(),
        clave: clave1.value.trim()
      };

      // ✅ Validación correcta
      if (!nuevoUsuario.usuario || !nuevoUsuario.email || !nuevoUsuario.clave) {
        alert("Todos los campos son obligatorios");
        return;
      }

      // ✅ Obtener usuarios existentes
      const usuarios = await getDatos();

      if (!Array.isArray(usuarios)) {
        throw new Error("La respuesta del servidor no es válida");
      }

      // ✅ Validar duplicado por email
      const existe = usuarios.some(
        u => u.email.toLowerCase() === nuevoUsuario.email.toLowerCase()
      );

      if (existe) {
        alert("Este email ya está registrado");
        return;
      }

      // ✅ Guardar usuario
      await postUser(nuevoUsuario);

      alert("Usuario registrado correctamente");
      form.reset();

    } catch (error) {
      console.error("Error:", error);
      alert("Error en el registro. Revisa el servidor.");
    }
  }

  form.addEventListener("submit", handleRegister);
});