// Recuperar la tarea que se va a editar
document.addEventListener('DOMContentLoaded', function() {
    const tareaToEdit = JSON.parse(localStorage.getItem("tareaToEdit"));
    
    // Si no hay tarea para editar, redirigir al inicio
    if (!tareaToEdit) {
        window.location.href = 'tareas.html'; // Redirigir si no hay tarea seleccionada
    }

    // Rellenar el formulario con los datos de la tarea
    document.getElementById("tarea-title").value = tareaToEdit.title;
    document.getElementById("tarea-content").value = tareaToEdit.content;
    document.getElementById("tarea-image").value = '';

    // Al enviar el formulario, guardar los cambios
    document.getElementById("edit-tarea-form").addEventListener("submit", function(event) {
        event.preventDefault();

        // Obtener los nuevos valores
        const updatedTitle = document.getElementById("tarea-title").value;
        const updatedContent = document.getElementById("tarea-content").value;
        const updatedImageFile = document.getElementById("tarea-image").files[0];
        
        // Actualizar la tarea con los nuevos datos
        const updatedTarea = {
            title: updatedTitle,
            content: updatedContent,
            image: tareaToEdit.image // Mantener la imagen original si no se elige una nueva
        };

        // Si se selecciona una nueva imagen, cargarla
        if (updatedImageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                updatedTarea.image = e.target.result;
                updateTareasInStorage(updatedTarea);
            };
            reader.readAsDataURL(updatedImageFile);
        } else {
            updateTareasInStorage(updatedTarea);
        }
    });

    // Función para guardar la tarea actualizada en localStorage
    function updateTareasInStorage(updatedTarea) {
        const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        const indexToUpdate = tareas.findIndex(tarea => tarea.title === tareaToEdit.title);
        if (indexToUpdate !== -1) {
            tareas[indexToUpdate] = updatedTarea;
            localStorage.setItem("tareas", JSON.stringify(tareas)); // Guardar los cambios
            window.location.href = 'tareas.html'; // Redirigir a la página de tareas
        }
    }
});

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html'; // Redirigir al login
}