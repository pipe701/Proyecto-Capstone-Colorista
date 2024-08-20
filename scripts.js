// scripts.js

document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();


    const carBrand = document.getElementById('carBrand').value;
    const carType = document.getElementById('carType').value;
    const colorBrand = document.getElementById('colorBrand').value;
    const carImage = document.getElementById('carImage').files[0];


    if (!carBrand || !carType || !colorBrand || !carImage) {
        alert('Por favor, complete todos los campos y suba una imagen.');
        return;
    }


    const formData = new FormData();
    formData.append('carBrand', carBrand);
    formData.append('carType', carType);
    formData.append('colorBrand', colorBrand);
    formData.append('carImage', carImage);

    displayResults({
        message: 'Procesando la imagen, por favor espere...'
    });
});

function displayResults(data) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = `<p>${data.message}</p>`;
    
}
