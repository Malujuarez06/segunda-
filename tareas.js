// Cargar las tareas almacenadas en localStorage
const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Función para mostrar las tareas
function renderTareas() {
    const tareasContainer = document.getElementById("tareas-container");
    tareasContainer.innerHTML = ''; // Limpiar las tareas previas

    tareas.forEach((tarea, index) => {
        const tareaElement = document.createElement("div");
        tareaElement.classList.add("tarea");

        tareaElement.innerHTML = `
            <img src="${tarea.image}" class="tarea-image" alt="Tarea imagen">
            <h3>${tarea.title}</h3>
            <p>${tarea.content}</p>
            <div class="tarea-actions">
                <button onclick="editTarea(${index})">Editar</button>
                <button onclick="deleteTarea(${index})">Eliminar</button>
                <button onclick="generatePdf(${index})">Generar PDF</button>
            </div>
        `;
        tareasContainer.appendChild(tareaElement);
    });
}

// Función para editar una tarea
function editTarea(index) {
    const tarea = tareas[index];
    localStorage.setItem("tareaToEdit", JSON.stringify(tarea));
    window.location.href = "create-tarea.html"; // Redirige a la página de edición
}

// Función para eliminar una tarea
function deleteTarea(index) {
    tareas.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(tareas)); // Guardar cambios en localStorage
    renderTareas(); // Volver a mostrar las tareas
}

// Función para generar un PDF de una tarea
function generatePdf(index) {
    const tarea = tareas[index];
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const usablePageWidth = pageWidth - 2 * margin;
    const usablePageHeight = pageHeight - 2 * margin;

    doc.setFontSize(16);
    doc.text(tarea.title, pageWidth / 2, margin + 10, { align: 'center' });

    doc.setFontSize(12);
    doc.text(tarea.content, margin + 10, margin + 20);

    if (tarea.image) {
        const img = new Image();
        img.src = tarea.image;
        img.onload = function () {
            const imgWidth = usablePageWidth / 2;
            const imgHeight = (img.height / img.width) * imgWidth;
            doc.addImage(img, 'JPEG', margin + 10, margin + 30, imgWidth, imgHeight);
            doc.save($tarea.title.pdf);
        };
    } else {
        doc.save($tarea.title.pdf);
    }
}

// Función para buscar las tareas
function searchTareas() {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const filteredTareas = tareas.filter(tarea => tarea.title.toLowerCase().includes(searchQuery));
    renderFilteredTareas(filteredTareas);
}

// Función para renderizar tareas filtradas
function renderFilteredTareas(filteredTareas) {
    const tareasContainer = document.getElementById("tareas-container");
    tareasContainer.innerHTML = '';
    filteredTareas.forEach((tarea, index) => {
        const tareaElement = document.createElement("div");
        tareaElement.classList.add("tarea");
        tareaElement.innerHTML = `
            <img src="${tarea.image}" class="tarea-image" alt="Tarea imagen">
            <h3>${tarea.title}</h3>
            <p>${tarea.content}</p>
            <div class="tarea-actions">
                <button onclick="editTarea(${index})">Editar</button>
                <button onclick="deleteTarea(${index})">Eliminar</button>
                <button onclick="generatePdf(${index})">Generar PDF</button>
            </div>
        `;
        tareasContainer.appendChild(tareaElement);
    });
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html'; // Redirigir al login
}

// Iniciar la carga de tareas al cargar la página
window.onload = renderTareas;