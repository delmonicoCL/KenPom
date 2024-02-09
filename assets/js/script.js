// Función para agregar una nueva tarea
function agregarTarea() {
  var nombreTarea = document.getElementById("nombreTarea").value;
  var descripcionTarea = document.getElementById("descripcionTarea").value;
  var importanciaTarea = document.getElementById("importanciaTarea").value;
  var fechaLimiteTarea = document.getElementById("fechaLimiteTarea").value;
  var panelKanban = "ToDo";

  // Crear un ID único para la tarea
  var tareaID = generarIDUnico();

  // Crear elemento de tarea
  var tareaCreada = document.createElement("div");
  tareaCreada.id = tareaID; // Asignar el ID a la tarea
  tareaCreada.classList.add("alert", "alert-info"); //Color nueva tarea
  tareaCreada.draggable = true; // Hacer el elemento arrastrable
  // tareaCreada.id = "task-" + Date.now(); // Asigna un ID 


  // Agregar ícono dependiendo de la importancia de la tarea
  var importanciaIcono = "";
  if (importanciaTarea === "Normal") {
    importanciaIcono = "<i class='fas fa-star d-flex justify-content-end'></i>"; // Icono para importancia normal
  } else if (importanciaTarea === "Urgente") {
    importanciaIcono = "<i class='d-flex justify-content-end fa-solid fa-bomb urgente'></i>"; // Icono para importancia urgente
  }
  else if (importanciaTarea === "Baja") {
    importanciaIcono = "<i class='d-flex justify-content-end fa-solid fa-face-smile-beam'></i>"; // Icono para importancia urgente
  }
  
  
  // Crea la tarea
  tareaCreada.innerHTML = ` 
    <strong>${importanciaIcono}</strong>
    <strong>${nombreTarea}</strong><br>
    <strong>Descripción:</strong> ${descripcionTarea}<br>
    <strong>Importancia:</strong> ${importanciaTarea}<br>
    <strong>Fecha Limite:</strong> ${fechaLimiteTarea}<br>
    <button class=" mt-3 btn btn-danger btn-sm btn-borrar">Borrar</button>
  `;

  // Agrega eventos de arrastre a las tareas creadas
  tareaCreada.addEventListener("dragstart", dragStart);

  // Agrega la nueva tarea al div "tareas"
  document.getElementById("tareas").appendChild(tareaCreada);

  // Guarda los datos de la tarea y la guardo en una variable LocalStorage
  guardarTareaEnLocalStorage(tareaID,panelKanban,nombreTarea, descripcionTarea, importanciaTarea, fechaLimiteTarea);

  // Cerrar modal
  $("#crearTareaModal").modal("hide");

  // Limpiar formulario
  document.getElementById("formularioTarea").reset();
  
// Agregar evento al botón de borrar
var botonBorrar = tareaCreada.querySelector(".btn-borrar");
botonBorrar.addEventListener("click", function() {
  if (confirm("¿Deseas eliminar esta tarea?")) {
    tareaCreada.remove(); // Eliminar la tarea del DOM
     // Eliminar la tarea del almacenamiento local
     eliminarTareaDeLocalStorage(tareaID);
  }
});

}

// Función para generar un ID único
function generarIDUnico() {
  return 'tarea-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}


// Función para guardar la tarea en localStorage
function guardarTareaEnLocalStorage(id,panelKanban, nombre, descripcion, importancia, fechaLimiteTarea) {
  // Obtener las tareas existentes del localStorage (si las hay)
  var tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.push({ id: id, panel: panelKanban, nombre: nombre, descripcion: descripcion, importancia: importancia, fecha: fechaLimiteTarea });
  // Guardar el arreglo actualizado en localStorage
  localStorage.setItem("tareas", JSON.stringify(tareas));
}


// Función para eliminar la tarea del almacenamiento local
function eliminarTareaDeLocalStorage(id) {
  var tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas = tareas.filter(function(tarea) {
    return tarea.id !== id;
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}


// Función para el inicio del arrastre (DRAG)
function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id); // Usar el ID de la tarea arrastrable
}


// Función para permitir soltar (DROP) tareas arrastrados
function allowDrop(event) {
  event.preventDefault();
}

// Función para soltar la tarea arrastrado cogiendo sus datos
function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  var tareaArrastrada = document.getElementById(data);

  // Mueve la tarea arrastrado a una nueva area
  event.target.appendChild(tareaArrastrada);
}

// Función para cargar las tareas desde localStorage y mostrarlas en el DOM
function cargarTareasDesdeLocalStorage() {
  var tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  var contenedorToDo = document.getElementById("tareas");

  tareas.forEach(function(tarea) {
    var tareaElemento = document.createElement("div");
    tareaElemento.id = tarea.id;
    tareaElemento.classList.add("alert", "alert-info");
    tareaElemento.draggable = true;

    tareaElemento.innerHTML = `
      <strong>${tarea.nombre}</strong><br>
      Descripción: ${tarea.descripcion}<br>
      Importancia: ${tarea.importancia}<br>
      Fecha de término: ${tarea.fecha}<br>
      <button class="mt-3 btn btn-danger btn-sm btn-borrar">Borrar</button>
    `;

    tareaElemento.addEventListener("dragstart", dragStart);

    contenedorToDo.appendChild(tareaElemento);

    var botonBorrar = tareaElemento.querySelector(".btn-borrar");
    botonBorrar.addEventListener("click", function() {
      if (confirm("¿Deseas eliminar esta tarea?")) {
        tareaElemento.remove();
        eliminarTareaDeLocalStorage(tarea.id);
      }
    });
  });
}

// Llama a la función para cargar las tareas desde localStorage y mostrarlas en el DOM
cargarTareasDesdeLocalStorage();
