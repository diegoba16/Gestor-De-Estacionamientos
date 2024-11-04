alert("Bienvenido al gestor de estacionamientos v1.0");

const vehicles = [];
const addVehicle = (marca, modelo, matricula) => {
    let flag = confirm("Desea agregar el vehículo " + marca + " " + modelo + " con matricula " + matricula + "?")
    if (flag) {
        vehicles.push({
            marca,
            modelo,
            matricula,
            sales: []
        });
    }
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
            }
            alert("Gasto agregado exitosamente")
        } else {
            alert("La matrícula no existe");
        }
    }
};

const showVehicles = () => {
    if (vehicles.length < 1) {
        alert("No hay vehículos registrados.");
        return;
    }

    let message = "Lista de vehículos:\n\n";
    vehicles.forEach((vehicle, index) => {
        message += `Vehículo ${index + 1}:\n`;
        message += `Marca: ${vehicle.marca}\n`;
        message += `Modelo: ${vehicle.modelo}\n`;
        message += `Matrícula: ${vehicle.matricula}\n`;

        if (vehicle.sales.length > 0) {
            message += "Ventas:\n";
            vehicle.sales.forEach((sale) => {
                message += `  Venta: ${sale.description} - $${sale.price}\n`;
            });
        } else {
            message += "No hay ventas registradas.\n";
        }

        message += "\n";
    });

    alert(message);
};


const parkingCore = () => {
    let option = Number(
        prompt(
            "Ingrese la opción deseada de forma numérica:\n\n  1 - Ingresar un nuevo vehículo\n  2 - Ingresar gasto sobre vehículo\n  3 - Revisar movimientos\n"
        )
    );

    let flag = true;

    while (flag) {
        switch (option) {
            case 1:
                alert("Seleccionó agregar un nuevo vehículo");
                let addBrand = (prompt("Ingresar marca del vehículo"))
                let addModel = (prompt("Ingresar modelo del vehículo"))
                let addPlate = (prompt("Ingresar matricula del vehículo"))
                addVehicle(addBrand, addModel, addPlate)
                flag = confirm(
                    "Desea ingresar otra opción?\nSeleccione Aceptar para continuar o Cancelar para salir del programa"
                );
                break;
            case 2:
                alert("Va a asociado un cobro sobre un vehículo existente");
                let addPlateSale = (prompt("Ingresar matricula del vehículo"))
                let addDescription = (prompt("Ingresa descripción sobre la venta"))
                let addPrice = Number(prompt("Ingresa el precio en dolares sin signos ni puntuación"))
                addSale(addPlateSale, addDescription, addPrice)
                flag = confirm(
                    "Desea ingresar otra opción?\nSeleccione Aceptar para continuar o Cancelar para salir del programa"
                );
                break;
            case 3:
                showVehicles();
                flag = confirm(
                    "Desea ingresar otra opción?\nSeleccione Aceptar para continuar o Cancelar para salir del programa"
                );
                break;
            default:
                flag = confirm(
                    "La opción ingresada no es correcta.\nAcepte para volver al menu o cancele para salir del programa"
                );
                break;
        }

        if (flag) {
            console.log("Hola")
            console.log(vehicles)
            option = Number(
                prompt(
                    "Ingrese la opción deseada de forma numérica:\n\n  1 - Ingresar un nuevo vehículo\n  2 - Ingresar gasto sobre vehículo\n  3 - Revisar movimientos\n"
                )
            );
        }
    }
};
parkingCore();
