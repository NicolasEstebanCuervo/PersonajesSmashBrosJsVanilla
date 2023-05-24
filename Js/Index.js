// Función para salir del personaje generado
function salir() {
  // Obtener elementos del DOM
  let botones = document.querySelector(".contenedor_botones");
  let infoDiv = document.getElementById("info");

  // Restablecer botones y eliminar información del personaje
  botones.innerHTML = `
    <button class="boton" onclick="mostrarInfo()">Generar un personaje al azar</button>
  `;
  infoDiv.classList.remove("div_personaje");
  infoDiv.innerHTML = ``;

  localStorage.removeItem("personaje");
}

// Función asincrónica para mostrar la información del personaje
async function mostrarInfo() {
  try {
    // Realizar solicitud para obtener datos de personajes desde un archivo JSON
    let response = await fetch("personajes.json");

    if (response.ok) {
      // Obtener los datos en formato JSON
      let data = await response.json();

      let numeroRandom;
      let personaje;

      // Verificar si hay un personaje almacenado en el almacenamiento local
      let storedPersonaje = localStorage.getItem("personaje");
      if (storedPersonaje) {
        // Si hay un personaje almacenado, usarlo
        personaje = JSON.parse(storedPersonaje);
      } else {
        // Si no hay un personaje almacenado, generar uno al azar
        numeroRandom = Math.floor(Math.random() * 10);
        personaje = data.personajes[numeroRandom];
        localStorage.setItem("personaje", JSON.stringify(personaje));
      }

      // Obtener la URL de la imagen del personaje
      let imagenURL = personaje.imagen;

      // Obtener elementos del DOM
      let infoDiv = document.getElementById("info");
      let botones = document.querySelector(".contenedor_botones");

      // Agregar clases y contenido al contenedor de información del personaje
      infoDiv.classList.add("div_personaje");
      infoDiv.innerHTML = `
        <img src="${imagenURL}">
        <div class="div_textos">
          <h1>¡Felicidades! Tu personaje es ${personaje.nombre}</h1>
          <p>Género: ${personaje.genero}</p>
          <p>Especie: ${personaje.especie}</p>
          <p>Juego: ${personaje.juego}</p>
        </div>
      `;

      // Cambiar botón a "Salir"
      botones.innerHTML = `
        <button class="boton" onclick="salir()">Salir</button>
      `;
    }
  } catch (error) {
    console.error("Error en la solicitud", error);
  }
}

// Evento que se dispara cuando se ha cargado el contenido de la ventana
window.addEventListener("DOMContentLoaded", function() {
  // Verificar si hay un personaje almacenado y mostrar su información
  let storedPersonaje = localStorage.getItem("personaje");
  if (storedPersonaje) {
    mostrarInfo();
  }
});
