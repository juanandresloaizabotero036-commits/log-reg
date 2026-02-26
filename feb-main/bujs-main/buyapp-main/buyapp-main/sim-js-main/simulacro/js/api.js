const API_URL = "http://localhost:3000/usuarios";

export async function getDatos() {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
}

export async function postUser(usuario) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });

    return await response.json();

  } catch (error) {
    console.error("Error al crear usuario:", error);
  }
}