// Crear tarea
document.getElementById("create-tarea-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("tarea-title").value;
    const content = document.getElementById("tarea-content").value;
    const imageFile = document.getElementById("tarea-image").files[0];

    if (title && content) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newTarea = {
                title,
                content,
                image: e.target.result // Guardar la imagen como una URL base64
            };
            const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
            tareas.push(newTarea);
            localStorage.setItem("tareas", JSON.stringify(tareas));
            window.location.href = "tareas.html"; // Redirigir a la página principal de tareas
        };
        if (imageFile) {
            reader.readAsDataURL(imageFile); // Cargar la imagen como una URL base64
        } else {
            const newTarea = { title, content, image: "" };
            const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
            tareas.push(newTarea);
            localStorage.setItem("tareas", JSON.stringify(tareas));
            window.location.href = "tareas.html"; // Redirigir a la página principal de tareas
        }
    } else {
        alert('Por favor, completa todos los campos.');
    }
});