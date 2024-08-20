// scripts.js

document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capturar los datos del formulario
    const carBrand = document.getElementById('carBrand').value;
    const carType = document.getElementById('carType').value;
    const colorBrand = document.getElementById('colorBrand').value;
    const carImage = document.getElementById('carImage').files[0];

    // Validación básica
    if (!carBrand || !carType || !colorBrand || !carImage) {
        alert('Por favor, complete todos los campos y suba una imagen.');
        return;
    }

    // Simulamos resultados según la marca del auto
    let simulatedResult;

    switch (carBrand) {
        case 'Toyota':
            simulatedResult = {
                colorName: 'Rojo Toyota',
                colorHex: '#C41E3A',
                message: 'Color detectado para Toyota'
            };
            break;
        case 'Ford':
            simulatedResult = {
                colorName: 'Azul Ford',
                colorHex: '#003399',
                message: 'Color detectado para Ford'
            };
            break;
        case 'BMW':
            simulatedResult = {
                colorName: 'Blanco BMW',
                colorHex: '#FFFFFF',
                message: 'Color detectado para BMW'
            };
            break;
        default:
            simulatedResult = {
                colorName: 'Color desconocido',
                colorHex: '#000000',
                message: 'No se encontró un color específico para esta marca'
            };
    }

    displayResults(simulatedResult);
});

function displayResults(data) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = `
        <p><strong>${data.message}</strong></p>
        <p>Color Detectado: ${data.colorName}</p>
        <div style="width: 100px; height: 100px; background-color: ${data.colorHex}; border: 1px solid #000;"></div>
        <p>Código HEX: ${data.colorHex}</p>
    `;
}
