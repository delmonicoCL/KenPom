// Llama a la función para cargar las tareas desde localStorage y mostrarlas en el DOM
cargarTareasDesdeLocalStorage();


// Función para cargar las tareas desde localStorage y mostrarlas en el DOM
function cargarTareasDesdeLocalStorage() {
  var tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  tareas.forEach(function(tarea) {
    var contenedorId = "";

    // Determina el ID del contenedor correspondiente según el valor de panel
    if (tarea.panel === "ToDo") {
      contenedorId = "DropToDo";
    } else if (tarea.panel === "Doing") {
      contenedorId = "DropDoing";
    } else if (tarea.panel === "Done") {
      contenedorId = "DropDone";
    }

    // Obtener el contenedor correspondiente
    var contenedor = document.getElementById(contenedorId);

    // Crear y agregar el elemento de tarea al contenedor correspondiente
    var tareaElemento = document.createElement("div");
    tareaElemento.id = tarea.id;
    tareaElemento.classList.add("alert", "ventanaTarea");
    tareaElemento.draggable = tarea.draggable !== false; // Restaurar el estado de arrastre

    // Agregar ícono dependiendo de la importancia de la tarea
    var importanciaIcono = "";
    if (tarea.importancia === "Normal") {
      importanciaIcono =
        "<i class='fas fa-star d-flex justify-content-end icono'></i>"; // Icono para importancia normal
    } else if (tarea.importancia === "Urgente") {
      importanciaIcono =
        "<i class='d-flex justify-content-end fa-solid fa-bomb urgente icono'></i>"; // Icono para importancia urgente
    } else if (tarea.importancia === "Baja") {
      importanciaIcono =
        "<i class='d-flex justify-content-end fa-solid fa-face-smile-beam icono'></i>"; // Icono para importancia urgente
    }

    tareaElemento.innerHTML = `
      <strong>${importanciaIcono}</strong>
      <strong>${tarea.nombre}</strong><br>
      <button class=" mt-3 btn bottonAyuda btn-sm btn-abrir">abrir</button>
      <button class="mt-3 btn bottonBorrar btn-sm btn-borrar">borrar</button>
    `;

    // Agregar evento al botón de abrir
    var botonAbrir = tareaElemento.querySelector(".btn-abrir");
    botonAbrir.addEventListener("click", function() {
      // Lógica para abrir el modal y mostrar la información de la tarea
      
      $("#myModal").modal("show");
      
      document.getElementById("nombreTareaModal").innerText = tarea.nombre;
      document.getElementById("descripcionTareaModal").innerText = tarea.descripcion;
      document.getElementById("importanciaTareaModal").innerText = tarea.importancia;
      document.getElementById("fechaLimiteTareaModal").innerText = tarea.fecha;
      
     
    });

    // Agregar evento al botón de borrar
    var botonBorrar = tareaElemento.querySelector(".btn-borrar");
    botonBorrar.addEventListener("click", function() {
      if (confirm("¿Deseas eliminar esta tarea?")) {
        tareaElemento.remove();
        eliminarTareaDeLocalStorage(tarea.id);
      }
    });

    // Agregar eventos de arrastre
    tareaElemento.addEventListener("dragstart", dragStart);
    tareaElemento.addEventListener("dragover", allowDrop);
    // tareaElemento.addEventListener("drop", drop);

    contenedor.appendChild(tareaElemento); // Agregar la tarea al contenedor correspondiente
  
  // Si la tarea está en el panel "Done" y su estado de arrastre es falso, deshabilitar la capacidad de arrastre
  if (tarea.panel === "Done" && !tarea.draggable) {
    tareaElemento.draggable = false;
  }
  
  });
}


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
  tareaCreada.classList.add("alert", "ventanaTarea"); //Color nueva tarea
  tareaCreada.draggable = true; // Hacer el elemento arrastrable
  // tareaCreada.id = "task-" + Date.now(); // Asigna un ID

  // Agregar ícono dependiendo de la importancia de la tarea
  var importanciaIcono = "";
  if (importanciaTarea === "Normal") {
    importanciaIcono = "<i class='fas fa-star d-flex justify-content-end'></i>"; // Icono para importancia normal
  } else if (importanciaTarea === "Urgente") {
    importanciaIcono =
      "<i class='d-flex justify-content-end fa-solid fa-bomb urgente'></i>"; // Icono para importancia urgente
  } else if (importanciaTarea === "Baja") {
    importanciaIcono =
      "<i class='d-flex justify-content-end fa-solid fa-face-smile-beam'></i>"; // Icono para importancia urgente
  }

  // Crea la tarea
  tareaCreada.innerHTML = ` 
    <strong>${importanciaIcono}</strong>
    <strong>${nombreTarea}</strong><br>
 
    
   
    <button class=" mt-3 btn bottonAyuda btn-sm btn-abrir">Abrir</button>
    <button class=" mt-3 btn bottonBorrar btn-sm btn-borrar">Borrar</button>
  `;


  // Agregar evento al botón de abrir
var botonAbrir = tareaCreada.querySelector(".btn-abrir");
botonAbrir.addEventListener("click", function () {
   
  $("#myModal").modal("show");
  
  console.log(importanciaIcono);
   
    // Puedes llenarlos con la información de la tarea así:
  document.getElementById("importanciaIconoModal").innerHTML = importanciaIcono;
  document.getElementById("nombreTareaModal").innerText = nombreTarea;
    document.getElementById("descripcionTareaModal").innerText = descripcionTarea;
    document.getElementById("importanciaTareaModal").innerText = importanciaTarea;
    document.getElementById("fechaLimiteTareaModal").innerText = fechaLimiteTarea;

});

  // Agrega eventos de arrastre a las tareas creadas
  tareaCreada.addEventListener("dragstart", dragStart);

  // Agrega la nueva tarea al div "panelToDo"
  document.getElementById("panelToDo").appendChild(tareaCreada);

  // Guarda los datos de la tarea y la guardo en una variable LocalStorage
  guardarTareaEnLocalStorage(
    tareaID,
    panelKanban,
    nombreTarea,
    descripcionTarea,
    importanciaTarea,
    fechaLimiteTarea
  );

  //Cerrar modal
  $("#crearTareaModal").modal("hide");

   // Limpiar formulario
   document.getElementById("formularioTarea").reset();

  // Agregar evento al botón de borrar
  var botonBorrar = tareaCreada.querySelector(".btn-borrar");
  botonBorrar.addEventListener("click", function () {
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
  

  //  // Determinar en qué área se soltó la tarea
  var nuevoPanel;
   if (event.target.id === "DropDoing") {
     nuevoPanel = "Doing";
     console.log("Doing");
       } else if (event.target.id === "DropDone") {
     nuevoPanel = "Done";
     console.log("Done");
     tareaArrastrada.draggable = false;
   } else {
     nuevoPanel = "ToDo";
     console.log("ToDo");
   }

  // Actualiza el valor del panelKanban
  var tareaID = tareaArrastrada.id;
  actualizarPanelKanban(tareaID, nuevoPanel);
  
}

// Función para actualizar el valor del panelKanban tanto en el DOM como en el almacenamiento local
function actualizarPanelKanban(tareaID, nuevoPanel) {
  var tareaElemento = document.getElementById(tareaID);
  // Actualiza el valor en el DOM
  tareaElemento.dataset.panelKanban = nuevoPanel;

  // Actualiza el valor en el almacenamiento local
  var tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.forEach(function(tarea) {
    if (tarea.id === tareaID) {
      tarea.panel = nuevoPanel;
    }
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}


// // Función para actualizar el campo panelKanban de una tarea en localStorage
function actualizarPanelKanbanDeTarea(tareaId, nuevoPanel, draggable) {
  // Obtener el array de tareas desde localStorage
  var tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  // Encuentra el elemento en el array que deseas actualizar
  var tareaAActualizar = tareas.find(function(tarea) {
    return tarea.id === tareaId;
  });

  // Verifica si se encontró la tarea y actualiza el valor de panelKanban y la capacidad de arrastre si es necesario
  if (tareaAActualizar) {
    tareaAActualizar.panel = nuevoPanel;
    tareaAActualizar.draggable = draggable;

    // Guarda el array actualizado de nuevo en localStorage
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }
}

// // // Llamada a la función para actualizar el campo panelKanban de una tarea específica
//  var tareaId = "ID_DE_LA_TAREA_A_ACTUALIZAR";
//  var nuevoPanel = "Doing";
//  actualizarPanelKanbanDeTarea(tareaId, nuevoPanel);



