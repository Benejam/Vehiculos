function retrieveInput(inputId: string) {
    return (<HTMLInputElement>document.querySelector(`#${inputId}`)).value;
}

function createCar(plate:string, brand:string, color:string){
    let car = new Car(plate, color, brand);
    displayCarInfo(car);
    displayAddWheelsForm(car);
}

function isPlateValid(plate: string) {
    const pattern = new RegExp("^([0-9]{4})([A-Z]{3})$", "i");
    return pattern.test(plate);
}

function callCreateCar() {
    const plate = retrieveInput("plate");
    const brand = retrieveInput("brand");
    const color = retrieveInput("color");
    
    if (isPlateValid(plate)) {
        createCar(plate, brand, color);
    } else {
        alert("Plate number not valid, must contain four digits and three letters (i.e. 1234ABC)");
    }
}

function displayCarInfo(car: Car) {
    const display = <HTMLDivElement>document.querySelector("#carInfo");
    display.innerHTML = "<p>The new car was successfully created:<p>";
    const carData = document.createElement("table");
    carData.innerHTML += `<tr><td>Plate</td> <td>${car.plate}</td></tr>`;
    carData.innerHTML += `<tr><td>Brand</td> <td>${car.brand}</td></tr>`;
    carData.innerHTML += `<tr><td>Color</td> <td>${car.color}</td></tr>`;
    carData.innerHTML += `<tr><td>Wheels</td> <td><pre>${JSON.stringify(car.wheels, undefined, 2)}</pre></td></tr>`;
    display.append(carData);
}

function isDiameterValid(diameter: number) {
    return diameter >= 0.4 && diameter <= 2;
}

function displayAddWheelsForm(car: Car) {
    (<HTMLDivElement>document.querySelector("#carForm")).classList.toggle("display-none");
    (<HTMLDivElement>document.querySelector("#wheelsForm")).classList.toggle("display-none");
    (<HTMLButtonElement>document.querySelector("#addWheels")).addEventListener("click", function() {
        const wheels: Wheel[] = [];
        for (let i = 1; i <= 4; i++) {
            const brand = (<HTMLInputElement>document.querySelector(`#wheel${i}Brand`)).value;
            let diameter = parseFloat((<HTMLInputElement>document.querySelector(`#wheel${i}Diameter`)).value);
            if (isDiameterValid(diameter)) {
                wheels.push(new Wheel(diameter, brand));
            } else {
                alert(`Invalid diameter for wheel ${i}. Introduce a number between 0.4 and 2`);
                wheels.splice(0, wheels.length);
                break;
            }
        }
        for (let wheel of wheels) {
            car.addWheel(wheel);
        }
        displayCarInfo(car);
    });
}