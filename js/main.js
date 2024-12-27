
const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

const addVehicle = (marca, modelo, matricula) => {
    vehicles.push({
        marca,
        modelo,
        matricula,
        sales: []
    });
    localStorage.setItem("vehicles", JSON.stringify(vehicles))
    Swal.fire({
        icon: "success",
        title: "Vehículo agregado exitosamente",
        showConfirmButton: false,
        timer: 2000
    });
};

document.addEventListener('DOMContentLoaded', () => {
    fetch('data/salesData.json')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('sale-select');
            const priceInput = document.getElementById('price');

            data.sales.forEach(sale => {
                const optionElement = document.createElement('option');
                optionElement.value = JSON.stringify(sale);
                optionElement.text = `${sale.description} - $${sale.price}`;
                selectElement.appendChild(optionElement);
            });

            selectElement.addEventListener('change', () => {
                const selectedSale = JSON.parse(selectElement.value); 
                priceInput.value = selectedSale.price || ""; 
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));

        const saleForm = document.getElementById('sale-form');
        saleForm.addEventListener('submit', (event) => {
            event.preventDefault();
        
            const matricula = document.getElementById('plate').value;
            const selectedSale = JSON.parse(document.getElementById('sale-select').value);
            const description = selectedSale.description;
            let price = document.getElementById('price').value;
        
            addSale(matricula, description, price);
        
            event.target.reset();
            showVehicles(); 
        });
});
const addSale = (matricula, description, price) => {
    if (vehicles.length < 1) {
        Swal.fire({
            title: "Error",
            text: "No se encuentran vehículos registrados",
            icon: "error"
          });
    } else {
        const vehicle = vehicles.find(v => v.matricula === matricula);
        if (vehicle) {
            Swal.fire({
                title: "Desea agregar la venta al vehículo matriculado " + matricula + "?",
                showDenyButton: true,
                confirmButtonText: "Aceptar",
                denyButtonText: `Cancelar`
              }).then((result) => {
                if (result.isConfirmed) {
                    vehicle.sales.push({
                        description,
                        price
                    });
                    localStorage.setItem("vehicles", JSON.stringify(vehicles));
                    showVehicles ();
        
                    Swal.fire({
                        icon: "success",
                        title: "Venta agregada exitosamente",
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else if (result.isDenied) {
                    Swal.fire({
                        title: "Venta cancelada",
                        icon: "warning"
                      });
                }
              });
        } else {
            Swal.fire({
                title: "Error",
                text: "La matrícula no existe",
                icon: "error"
              });
        }
    }
};

const showVehicles = () => {
    const vehicleListContainer = document.getElementById('vehicle-list');
    vehicleListContainer.innerHTML = ''; 

    if (vehicles.length < 1) {
        vehicleListContainer.innerHTML = '<p>No hay vehículos registrados.</p>';
        return;
    }

    vehicles.forEach((vehicle, index) => {
        const vehicleDiv = document.createElement('div');

        vehicleDiv.innerHTML = `
            <p><strong>Marca:</strong> ${vehicle.marca}</p>
            <p><strong>Modelo:</strong> ${vehicle.modelo}</p>
            <p><strong>Matrícula:</strong> ${vehicle.matricula}</p>
        `;

        if (vehicle.sales.length > 0) {
            const salesList = document.createElement('ul');
            salesList.innerHTML = '<h4>Ventas:</h4>';

            vehicle.sales.forEach((sale, saleIndex) => {
                const saleItem = document.createElement('li');
                saleItem.textContent = `${sale.description} - $${sale.price}`;
                salesList.appendChild(saleItem);
            });

            vehicleDiv.appendChild(salesList);
        } else {
            vehicleDiv.innerHTML += '<p>No hay ventas registradas.</p>';
        }

        vehicleListContainer.appendChild(vehicleDiv);
    });
};


document.getElementById('vehicle-form').addEventListener('submit', (event) => {
    event.preventDefault();


    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const matricula = document.getElementById('matricula').value;


    addVehicle(marca, modelo, matricula);

    event.target.reset();
    showVehicles(); 
});


document.getElementById('sale-form').addEventListener('submit', (event) => {
    event.preventDefault();


    const matricula = document.getElementById('plate').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;


    addSale(matricula, description, price);

    event.target.reset();
    showVehicles(); 
});
showVehicles(); 

