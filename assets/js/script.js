function agregarTarea() {
    var nombreTarea = document.getElementById('nombreTarea').value;
    var descripcionTarea = document.getElementById('descripcionTarea').value;
    var importanciaTarea = document.getElementById('importanciaTarea').value;
    var fechaTerminoTarea = document.getElementById('fechaTerminoTarea').value;
  
    // Crear elemento de tarea
    var tareaElemento = document.createElement('div');
    tareaElemento.classList.add('alert', 'alert-info');
    tareaElemento.innerHTML = `
      <strong>${nombreTarea}</strong><br>
      Descripción: ${descripcionTarea}<br>
      Importancia: ${importanciaTarea}<br>
      Fecha de término: ${fechaTerminoTarea}
    `;
  
    // Agregar tarea al div "tareas"
    document.getElementById('tareas').appendChild(tareaElemento);
  
    // Cerrar modal
    $('#crearTareaModal').modal('hide');
  
    // Limpiar formulario
    document.getElementById('formularioTarea').reset();
  }
  