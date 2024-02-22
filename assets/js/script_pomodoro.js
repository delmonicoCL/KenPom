let temporizador;
let tiempoRestante;
let corriendo = false;
let pomodorosRestantes = 3;
let duracionPomodoro = 30; // 20 minutos en segundos
let duracionDescanso = 5; // 5 minutos en segundos

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("imagenPausePlay").src = "/assets/img/play.png";
  document.getElementById("tiempo-restante").textContent  = "KANPOM";

 
});
// document.addEventListener("DOMContentLoaded", accionPomodoro);

function accionPomodoro() {
  const barraProgreso = document.querySelector(".barra-progreso");
  while (barraProgreso.firstChild) {
    barraProgreso.removeChild(barraProgreso.firstChild);
  }

  const gif = document.createElement("img");
  gif.src = "/assets/img/tomatin.gif"; // Ruta del GIF
  gif.alt = "GIF";
  gif.classList = "tomatinCaminando";
  barraProgreso.appendChild(gif);

  duracionEnSegundos = duracionPomodoro;
  const anchoGif = gif.clientWidth;
  const anchoBarraProgreso = barraProgreso.clientWidth;
  const pixelesAMover = anchoBarraProgreso - anchoGif;

  gif.style.left = `${pixelesAMover}px`;
  gif.style.transition = `left ${duracionEnSegundos}s linear`;

  setTimeout(() => {
    // pomodoroTerminado.style.display = "block";

  }, duracionEnSegundos * 1000);
}

function pausarGif() {
  const gif = document.querySelector(".tomatinCaminando");
  gif.style.transition = "none"; // Elimina la transición para detener el movimiento
  const estilo = window.getComputedStyle(gif);
  const actualLeft = parseInt(estilo.getPropertyValue("left"));
  gif.style.left = `${actualLeft}px`; // Fija la posición actual del gif
}

function reanudarGif() {
  const gif = document.querySelector(".tomatinCaminando");
  if (gif) {
    gif.style.transition = `left ${tiempoRestante}s linear`; // Vuelve a aplicar la transición
  } else {
    console.error("El elemento .tomatinCaminando no se encontró en el DOM.");
  }
}



function descansoPomodoro() {
  const barraProgreso = document.querySelector(".barra-progreso");
  while (barraProgreso.firstChild) {
    barraProgreso.removeChild(barraProgreso.firstChild);
  }

  const gif = document.createElement("img");
  gif.src = "/assets/img/tomatin.gif"; // Ruta del GIF
  gif.alt = "GIF";
  gif.classList ="tomatinCaminando"
  barraProgreso.appendChild(gif);

  const pomodoroTerminado = document.getElementById("pomodoro-terminado");
  duracionEnSegundos=duracionPomodoro;
  // const duracionEnSegundos = 30; // Duración en segundos
  const anchoGif = gif.clientWidth;
  const anchoBarraProgreso = barraProgreso.clientWidth;
  const pixelesAMover = anchoBarraProgreso - anchoGif;
  
  gif.style.transition = `left ${duracionEnSegundos}s linear`;
  gif.style.left = `${pixelesAMover}px`;

  setTimeout(() => {
    // pomodoroTerminado.style.display = "block";
   
  }, duracionEnSegundos * 1000);
}

function configurarTemporizador() {
  pomodorosRestantes = parseInt(document.getElementById("pomodoros").value);
  console.log(pomodorosRestantes);
  duracionPomodoro =
    parseInt(document.getElementById("duracion-pomodoro").value) * 60;
  duracionDescanso =
    parseInt(document.getElementById("duracion-descanso").value) * 60;
  tiempoRestante = duracionPomodoro;
  actualizarVisualizacionTemporizador();
  
  // document.getElementById("etiqueta-temporizador").innerText = "Pomodoro";
  // document.getElementById("temporizador-container").style.display = "block";
  cargarPomodoros();
}

function cargarPomodoros() {
  var divPomodoros = document.getElementById("cantidadPomodoros");
  divPomodoros.innerHTML = "";
  for (var i = 0; i < pomodorosRestantes; i++) {
    var imagenPomodoro = document.createElement("img");
    imagenPomodoro.src = "assets/img/tomatin_pomodoro.png";
    imagenPomodoro.classList.add("pomodoros");
    divPomodoros.appendChild(imagenPomodoro);
  }
}

function iniciarDetener() {
  if (corriendo) {
    clearInterval(temporizador);
        corriendo = false;
    document.getElementById("imagenPausePlay").src = "/assets/img/play.png";
    pausarGif(); // Detiene el gif al pausar el temporizador
  } else {
    
    temporizador = setInterval(decrementarTemporizador, 1000);
    corriendo = true;
    document.getElementById("imagenPausePlay").src = "/assets/img/pause.png";
    reanudarGif(); // Reanuda el gif al reanudar el temporizador
 
  }
}

function decrementarTemporizador() {
  
    if (tiempoRestante > 0) {
    tiempoRestante--;
        actualizarVisualizacionTemporizador();
        
    } else {
        
      clearInterval(temporizador);
 
    if (pomodorosRestantes > 0) {
      if (
        
        document.getElementById("info-pantalla").textContent  ==="Pomodoro"
        
      ) {
        document.getElementById("info-pantalla").textContent  = "Descanso";
        tiempoRestante = duracionDescanso;
        breakMP3.play();
        descansoPomodoro();
      } else {
        document.getElementById("info-pantalla").textContent  =
          "Pomodoro";
        tiempoRestante = duracionPomodoro;
        pomodorosRestantes--;
        cargarPomodoros();
        accionPomodoro();
      }
      temporizador = setInterval(decrementarTemporizador, 1000);
    } else {
      
        document.getElementById("info-pantalla").textContent  = "Has terminado";
        document.getElementById("imagenPausePlay").src = "/assets/img/play.png";
        // Cargar una imagen en el div con id "info_texto"
      document.getElementById("cantidadPomodoros").innerHTML =
        '<img src="/assets/img/tomatin.gif" alt="Imagen de terminado" class="tomatin">';
        // const elemento = document.getElementById("barra-progreso");
        // elemento.innerHTML = ""; // Esto eliminará todo el contenido dentro del div con el ID "barra-progreso"  
        recargarPagina();

        


      termino_pomodoroMP3.play();
    }
  }
}

function resetearTemporizador() {
  // clearInterval(temporizador);
  // pomodorosRestantes = parseInt(document.getElementById("pomodoros").value);
  // duracionPomodoro = parseInt(document.getElementById("duracion-pomodoro").value);
  // duracionDescanso = parseInt(document.getElementById("duracion-descanso").value);
  // tiempoRestante = duracionPomodoro;
  // corriendo = false;
  document.getElementById("imagenPausePlay").src = "/assets/img/play.png";
  // actualizarVisualizacionTemporizador();
  window.location.reload();
}

function actualizarVisualizacionTemporizador() {
  const minutos = Math.floor(tiempoRestante / 60);
  const segundos = tiempoRestante % 60;
  document.getElementById("tiempo-restante").innerText = `${minutos}:${
    segundos < 10 ? "0" : ""
  }${segundos}`;
}


document.addEventListener("DOMContentLoaded", function () {
  cargarPomodoros();
});



function recargarPagina() {
  

  // Al finalizar la función, espera X segundos y luego recarga la página
  setTimeout(function() {
    window.location.reload();
  }, 9000); // 5000 milisegundos son equivalentes a 5 segundos
}


const termino_pomodoroMP3 = new Audio("assets/media/termino_pomodoro.mp3");
const breakMP3 = new Audio("assets/media/break.mp3");

