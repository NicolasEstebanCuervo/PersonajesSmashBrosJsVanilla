let request = new XMLHttpRequest();

function salir (){
  let botones = document.querySelector(".contenedor_botones")
  let infoDiv = document.getElementById("info")

  botones.innerHTML =`    
    <button class="boton" onclick="mostrarInfo()">Generar personaje al azar</button>
  `
  infoDiv.classList.remove("div_personaje");
  infoDiv.innerHTML=` 
  `  
}

function mostrarInfo() {
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let numeroRandom = Math.floor(Math.random() * 10);
      let personaje = JSON.parse(this.responseText).personajes[numeroRandom];
      let imagenURL = personaje.imagen;
      let infoDiv = document.getElementById("info")
      let botones = document.querySelector(".contenedor_botones")

      infoDiv.classList.add("div_personaje");
      infoDiv.innerHTML = `
        <img src="${imagenURL}">
        <div class="div_textos">
          <h1>¡Felicidades! Tu personaje fue ${personaje.nombre}</h1>
          <p>Genero: ${personaje.genero}<p/>
          <p>Especie: ${personaje.especie}<p/>
          <p>Juego: ${personaje.juego}<p/>
        </div>
      ` 
      botones.innerHTML =`
        <button class="boton" onclick="salir()">Salir</button>
        <button class="boton" onclick="mostrarInfo()">Generar otro personaje</button>
      `
    }
    
  };
  
  request.open("GET", "personajes.json", true);
  request.send();
}
