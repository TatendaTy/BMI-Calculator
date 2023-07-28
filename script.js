function calculateBMI(height, weight) {
    return weight / ((height / 100) ** 2);
}

function displayBMIResult(bmi, age) {
    const resultElement = document.getElementById('output');
    resultElement.textContent = `Your BMI is ${bmi.toFixed(2)}.`;

    if (bmi < 18.5) {
        resultElement.textContent += " You are Underweight.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        resultElement.textContent += " You are Normal.";
    } else {
        resultElement.textContent += " You are Overweight.";
    }

    resultElement.textContent += ` Your Age: ${age}.`;
}

function validateInput(value, errorMessageElement) {
    if (isNaN(value) || value <= 0) {
        errorMessageElement.textContent = "Please Enter Valid Value";
        return false;
    } else {
        errorMessageElement.textContent = "";
        return true;
    }
}

const button = document.getElementById('btn');
button.addEventListener('click', () => {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const ageInput = document.getElementById('age');
    const result = document.getElementById('output');
    const heightError = document.getElementById('heightError');
    const weightError = document.getElementById('weightError');
    const ageError = document.getElementById('ageError');

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    const age = parseInt(ageInput.value);

    const heightValid = validateInput(height, heightError);
    const weightValid = validateInput(weight, weightError);
    const ageValid = validateInput(age, ageError);

    if (heightValid && weightValid && ageValid) {
        const bmi = calculateBMI(height, weight);
        displayBMIResult(bmi, age);
        saveBMIDataToLocalStorage(bmi, age);
    } else {
        result.textContent = "";
    }
});

function saveBMIDataToLocalStorage(bmi, age) {
    localStorage.setItem('bmiResult', bmi.toFixed(2));
    localStorage.setItem('age', age);
}

function getBMIDataFromLocalStorage() {
    const savedBMI = localStorage.getItem('bmiResult');
    const savedAge = localStorage.getItem('age');
    if (savedBMI && savedAge) {
        const bmi = parseFloat(savedBMI);
        const age = parseInt(savedAge);
        displayBMIResult(bmi, age);
    }
}

// Retrieve the BMI result from local storage when the page loads
document.addEventListener('DOMContentLoaded', getBMIDataFromLocalStorage);