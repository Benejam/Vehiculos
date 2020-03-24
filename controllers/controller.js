"use strict";
function searchInput(inputId) {
    return document.querySelector("#" + inputId).value;
}
function createCar(plate, brand, color) {
    var car = new Car(plate, color, brand);
    displayCarInfo(car);
    displayAddWheelsForm(car);
}
function isPlateValid(plate) {
    var pattern = new RegExp("^([0-9]{4})([A-Z]{3})$", "i");
    return pattern.test(plate);
}
function callCreateCar() {
    var plate = searchInput("plate");
    var brand = searchInput("brand");
    var color = searchInput("color");
    if (isPlateValid(plate)) {
        createCar(plate, brand, color);
    }
    else {
        alert("El número de matrícula introducido no es correcto. Por favor introduzca 4 dígitos y 3 letras (i.e. 1234ABC)");
    }
}
function displayCarInfo(car) {
    var display = document.querySelector("#carInfo");
    display.innerHTML = "<p>Su coche ha sido creado:<p>";
    var carData = document.createElement("table");
    carData.innerHTML += "<tr><td>Matrícula</td> <td>" + car.plate + "</td></tr>";
    carData.innerHTML += "<tr><td>Marca</td> <td>" + car.brand + "</td></tr>";
    carData.innerHTML += "<tr><td>Color</td> <td>" + car.color + "</td></tr>";
    carData.innerHTML += "<tr><td>Neumáticos</td> <td><pre>" + JSON.stringify(car.wheels, undefined, 2) + "</pre></td></tr>";
    display.append(carData);
}
function isDiameterValid(diameter) {
    return diameter >= 0.4 && diameter <= 2;
}
function displayAddWheelsForm(car) {
    document.querySelector("#carForm").classList.toggle("display-none");
    document.querySelector("#wheelsForm").classList.toggle("display-none");
    document.querySelector("#addWheels").addEventListener("click", function () {
        var wheels = [];
        for (var i = 1; i <= 4; i++) {
            var brand = document.querySelector("#Wheel" + i + "Brand").value;
            var diameter = parseFloat(document.querySelector("#Wheel" + i + "Diameter").value);
            if (isDiameterValid(diameter)) {
                wheels.push(new Wheel(diameter, brand));
            }
            else {
                alert("El diámetro de la rueda es erróneo " + i + ". Por favor introduzca un diámetro entre 0.4 y 2");
                wheels.splice(0, wheels.length);
                break;
            }
        }
        for (var contador = 0, wheels_1 = wheels; contador < wheels_1.length; contador++) {
            var wheel = wheels_1 [contador];
            car.addWheel(wheel);
        }
        displayCarInfo(car);
    });
}
