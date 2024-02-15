let temporizador;
let tiempoRestante;
let corriendo = false;
let pomodorosRestantes = 3;
let duracionPomodoro = 10; // 20 minutos en segundos
let duracionDescanso = 10; // 5 minutos en segundos

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("imagenPausePlay").src = "/assets/img/play.png";
});

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
    imagenPomodoro.src = "assets/img/pomodoro.png";
    imagenPomodoro.classList.add("pomodoros");
    divPomodoros.appendChild(imagenPomodoro);
  }
}

function iniciarDetener() {
  if (corriendo) {
    clearInterval(temporizador);
    corriendo = false;
    document.getElementById("imagenPausePlay").src = "/assets/img/play.png";
  } else {
    temporizador = setInterval(decrementarTemporizador, 1000);
    corriendo = true;
    document.getElementById("imagenPausePlay").src = "/assets/img/pause.png";
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
        // breakMP3.play();
      } else {
        document.getElementById("info-pantalla").textContent  =
          "Pomodoro";
        tiempoRestante = duracionPomodoro;
        pomodorosRestantes--;
        cargarPomodoros();
      }
      temporizador = setInterval(decrementarTemporizador, 1000);
    } else {
        document.getElementById("info-pantalla").textContent  = "Has terminado";
        document.getElementById("imagenPausePlay").src = "/assets/img/play.png";
        // Cargar una imagen en el div con id "info_texto"
      document.getElementById("cantidadPomodoros").innerHTML =
        '<img src="/assets/img/tomatin.gif" alt="Imagen de terminado" class="tomatin">';


      // termino_pomodoroMP3.play();
    }
  }
}

function actualizarVisualizacionTemporizador() {
  const minutos = Math.floor(tiempoRestante / 60);
  const segundos = tiempoRestante % 60;
  document.getElementById("tiempo-restante").innerText = `${minutos}:${
    segundos < 10 ? "0" : ""
  }${segundos}`;
}

function resetearTemporizador() {
  clearInterval(temporizador);
  pomodorosRestantes = 5;
  tiempoRestante = duracionPomodoro;
  corriendo = false;
  document.getElementById("etiqueta-temporizador").innerText = "Pomodoro";
  actualizarVisualizacionTemporizador();
}

document.addEventListener("DOMContentLoaded", function () {
  cargarPomodoros();
});

// const termino_pomodoroMP3 = new Audio("assets/media/termino_pomodoro.mp3");
// const breakMP3 = new Audio("assets/media/break.mp3");

// let temporizador;
// let tiempoRestante = 1200; // 20 minutos en segundos
// let corriendo = false;
// let pomodorosRestantes = 3;
// let duracionPomodoro = 1200;
// let duracionDescanso = 5;

// document.addEventListener("DOMContentLoaded", function () {
//   // Código que se ejecutará cuando el DOM esté completamente cargado
//   document.getElementById("imagenPausePlay").src = "/assets/img/play.png";
// });

// function configurarTemporizador() {
//   pomodorosRestantes = parseInt(document.getElementById("pomodoros").value);
//   duracionPomodoro = parseInt(document.getElementById("duracion-pomodoro").value) * 60;
//   duracionDescanso = parseInt(document.getElementById("duracion-descanso").value) * 60;
//   tiempoRestante = duracionPomodoro;
//   actualizarVisualizacionTemporizador();
//   document.getElementById("etiqueta-temporizador").innerText = "Pomodoro";
//     document.getElementById("temporizador-container").style.display = "block";
//      cargarPomodoros();
// }

// function cargarPomodoros() {
//   // Obtener el div donde se agregarán las imágenes de pomodoros
//   var divPomodoros = document.getElementById("cantidadPomodoros");

//   // Limpiar el contenido del div antes de agregar nuevas imágenes
//   divPomodoros.innerHTML = "";

//   // Crear una imagen de pomodoro y agregarla al div la cantidad de veces necesaria
//   for (var i = 0; i < pomodorosRestantes; i++) {
//     var imagenPomodoro = document.createElement("img");
//     imagenPomodoro.src = "assets/img/pomodoro.png";
//     imagenPomodoro.classList.add("pomodoros");
//     divPomodoros.appendChild(imagenPomodoro);
//   }
// }

// function iniciarDetener() {
//   if (corriendo) {
//     clearInterval(temporizador);
//     corriendo = false;

//     // Actualizar la imagen a PLAY cuando este detenido /assets/img/play.png
//     document.getElementById("imagenPausePlay").src = "/assets/img/play.png";
//   } else {
//     temporizador = setInterval(decrementarTemporizador, 1000);
//     corriendo = true;

//     // Actualizar la imagen a PAUSE cuando este parado /assets/img/pause.png
//     document.getElementById("imagenPausePlay").src = "/assets/img/pause.png";
//   }
// }

// function decrementarTemporizador() {
//   if (tiempoRestante > 0) {
//     tiempoRestante--;
//     actualizarVisualizacionTemporizador();
//   } else {
//     clearInterval(temporizador);
//     pomodorosRestantes--;
//     if (pomodorosRestantes > 0) {
//       if (document.getElementById("info-pantalla").innerText === "Pomodoro") {
//         document.getElementById("info-pantalla").innerText = "Descanso";
//           tiempoRestante = duracionDescanso;
//            breakMP3.play();
//       } else {
//         document.getElementById("info-pantalla").innerText = "Pomodoro";
//         tiempoRestante = duracionPomodoro;
//       }
//       temporizador = setInterval(decrementarTemporizador, 1000);
//     } else {
//         document.getElementById("info-pantalla").innerText = "Terminado";
//         termino_pomodoroMP3.play();

//     }
//   }
// }

// function actualizarVisualizacionTemporizador() {
//   const minutos = Math.floor(tiempoRestante / 60);
//   const segundos = tiempoRestante % 60;
//   document.getElementById("tiempo-restante").innerText = `${minutos}:${
//     segundos < 10 ? "0" : ""
//   }${segundos}`;
// }

// function resetearTemporizador() {
//   clearInterval(temporizador);
//   pomodorosRestantes = 5;
//   tiempoRestante = duracionPomodoro;
//   corriendo = false;
// //   document.getElementById("iniciar_detener").innerText = "Iniciar";
//   document.getElementById("etiqueta-temporizador").innerText = "Pomodoro";
//   actualizarVisualizacionTemporizador();
// }

// // Llamada a la función cargarPomodoros después de que el DOM esté completamente cargado
// document.addEventListener("DOMContentLoaded", function() {
//   cargarPomodoros();
// });

// const termino_pomodoroMP3 = new Audio("assets/media/termino_pomodoro.mp3");
// // Ganaste.volume = 0.5;
// const breakMP3 = new Audio("assets/media/break.mp3");
// // Ganaste.volume = 0.5;
