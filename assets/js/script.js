// Función para agregar una nueva tarea
function agregarTarea() {
  var nombreTarea = document.getElementById("nombreTarea").value;
  var descripcionTarea = document.getElementById("descripcionTarea").value;
  var importanciaTarea = document.getElementById("importanciaTarea").value;
  var fechaTerminoTarea = document.getElementById("fechaTerminoTarea").value;

  // Crear elemento de tarea
  var tareaCreada = document.createElement("div");
  tareaCreada.classList.add("alert", "alert-info");
  tareaCreada.draggable = true; // Hacer el elemento arrastrable
  tareaCreada.id = "task-" + Date.now(); // Asignar un ID único
  tareaCreada.innerHTML = `
    <strong>${nombreTarea}</strong><br>
    <strong>Descripción:</strong> ${descripcionTarea}<br>
    <strong>Importancia:</strong> ${importanciaTarea}<br>
    <strong>Fecha de término:</strong> ${fechaTerminoTarea}
  `;

  // Agregar eventos de arrastre
  tareaCreada.addEventListener("dragstart", dragStart);

  // Agregar tarea al div "tareas"
  document.getElementById("tareas").appendChild(tareaCreada);
  // Cerrar modal
  $("#crearTareaModal").modal("hide");

  // Limpiar formulario
  document.getElementById("formularioTarea").reset();
}

// Función para manejar el inicio del arrastre
function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id); // Usar el ID del elemento arrastrable
}


// Función para permitir el soltar elementos arrastrados
function allowDrop(event) {
  event.preventDefault();
}

// Función para manejar el soltar un elemento arrastrado
function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  var tareaArrastrada = document.getElementById(data);

  // Mover el elemento arrastrado al área DropDoing
  event.target.appendChild(tareaArrastrada);
}
