filterForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const selectedBrand = carBrand.value;
    const selectedType = carType.value;
    const archivo = document.getElementById('archivo').files[0];

    if (selectedBrand && selectedType && archivo) {
        const formData = new FormData();
        formData.append('carBrand', selectedBrand);
        formData.append('carType', selectedType);
        formData.append('archivo', archivo);

        try {
            const response = await fetch('/api/scan', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            // Limpiar tabla de resultados
            resultTableBody.innerHTML = '';

            // Agregar fila a la tabla
            if (result) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><img src="${result.imagen}" alt="Color ${result.color}"></td>
                    <td>${selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}</td>
                    <td>${result.codigo}</td>
                    <td>${result.manos}</td>
                    <td>${result.modelo}</td>
                    <td>${result.nombre}</td>
                `;
                resultTableBody.appendChild(row);
            }
        } catch (error) {
            console.error('Error al escanear la imagen:', error);
        }
    } else {
        alert("Por favor selecciona una marca, un modelo y sube una imagen.");
    }
});
