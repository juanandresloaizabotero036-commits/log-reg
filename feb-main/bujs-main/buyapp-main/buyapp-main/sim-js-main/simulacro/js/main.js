
const STORAGE_KEY = "usuarios";
const app = document.getElementById("app");

app.innerHTML = `
  <div class="login">
    <h2>login user</h2>

    
    <input type="text" id="usuario" placeholder="usuario">
    <input type="text" id="email" placeholder="email">
    <p>Clave</p>
    <input type="password" id="clave" placeholder="placeholder">
    <hr>
    <button class="button" id="btnLogin">Entrar</button>
    <a href="register.html">Register</a>

    <p id="mensaje"></p>
  </div>
`;
const API_URL = "http://localhost:3000/usuarios"; // cambia por la IP de tu Pi

async function obtenerUsuariosAPI() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error conectando con el servidor");
  }

  return await response.json();
}

function login(usuario, clave, email) {
  return new Promise(async (resolve, reject) => {
    try {
      const usuarios = await obtenerUsuariosAPI();

      const existe = usuarios.find(
        u =>
          u.usuario === usuario&&
          u.clave === clave&&
          u.email === email
      );

      if (existe) {
        localStorage.setItem("login", "true");
        localStorage.setItem("usuarioActivo", JSON.stringify(existe));
        resolve("Login correcto");
      } else {
        reject("Credenciales incorrectas");
      }
    } catch (error) {
      reject("No se pudo conectar al servidor");
    }
  });
}



const boton = document.getElementById("btnLogin");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", () => {
  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value;

  mensaje.textContent = "⏳ Verificando...";
  mensaje.style.color = "white";

  login(usuario, clave)
  .then(() => {
    if (usuario === "admin" && clave === "14414"&& u.email === email ) {
      window.location.href = "ordenes.html";
    } else {
      window.location.href = "carrito.html";
    }
  })
  .catch(error => {
    mensaje.textContent = error;
    mensaje.style.color = "red";
  });

});

boton.addEventListener("click", () => {
  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value;
  const email = document.getElementById("email").value;

  if (!usuario || !clave || !email) {
    mensaje.textContent = "Completa todos los campos";
    mensaje.style.color = "orange";
    return;
  }

  mensaje.textContent = "⏳ Verificando...";
  mensaje.style.color = "white";

  login(usuario, clave, email)
    .then(() => {
      window.location.href = "admin.html";
    })
    .catch(error => {
      mensaje.textContent = error;
      mensaje.style.color = "red";
    });
});





