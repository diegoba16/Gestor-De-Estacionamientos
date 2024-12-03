
const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

const addVehicle = (marca, modelo, matricula) => {
    vehicles.push({
        marca,
        modelo,
        matricula,
        sales: []
    });
    localStorage.setItem("vehicles", JSON.stringify(vehicles))
};


const addSale = (matricula, description, price) => {
    if (vehicles.length < 1) {
        alert("No se encuentran vehículos registrados");
    } else {
        const vehicle = vehicles.find(v => v.matricula === matricula);
        if (vehicle) {
            let flag = confirm("Desea agregar la venta al vehículo matriculado " + matricula + "?");
            if (flag) {
                vehicle.sales.push({
                    description,
                    price
                });
                localStorage.setItem("vehicles", JSON.stringify(vehicles))
            }
            alert("Gasto agregado exitosamente")
        } else {
            alert("La matrícula no existe");
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

