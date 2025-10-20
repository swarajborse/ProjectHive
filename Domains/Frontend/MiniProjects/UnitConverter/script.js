const inputValue = document.getElementById('input-value');
const fromUnit = document.getElementById('from-unit');
const outputValue = document.getElementById('output-value');
const toUnit = document.getElementById('to-unit');
const errorMsg = document.getElementById('error-msg');

const conversionRates = {
    // Length
    'cm-in': 0.393701,
    'in-cm': 2.54,
    // Weight
    'kg-lb': 2.20462,
    'lb-kg': 0.453592,
    // Compatibility groups
    length: ['cm', 'in'],
    weight: ['kg', 'lb'],
    temp: ['c', 'f'],
};

function getCompatibilityGroup(unit) {
    if (conversionRates.length.includes(unit)) return 'length';
    if (conversionRates.weight.includes(unit)) return 'weight';
    if (conversionRates.temp.includes(unit)) return 'temp';
    return null;
}

function convertUnits() {
    const from = fromUnit.value;
    const to = toUnit.value;
    const input = parseFloat(inputValue.value);
    
    const fromGroup = getCompatibilityGroup(from);
    const toGroup = getCompatibilityGroup(to);

    if (fromGroup !== toGroup || !fromGroup) {
        outputValue.value = '';
        errorMsg.textContent = 'Conversion not possible (Incompatible units).';
        return;
    }
    
    errorMsg.textContent = ''; // Clear error

    if (isNaN(input)) {
        outputValue.value = '';
        return;
    }

    let result;

    // Handle special case: Temperature
    if (fromGroup === 'temp') {
        if (from === 'c' && to === 'f') {
            result = (input * 9/5) + 32;
        } else if (from === 'f' && to === 'c') {
            result = (input - 32) * 5/9;
        } else {
            result = input; // c to c or f to f
        }
    } else {
        // Handle length and weight
        const conversionKey = `${from}-${to}`;
        if (conversionRates[conversionKey]) {
            result = input * conversionRates[conversionKey];
        } else if (from === to) {
            result = input; // cm to cm or kg to kg
        }
    }
    
    outputValue.value = result.toFixed(2);
}

// Add event listeners to all inputs
[inputValue, fromUnit, toUnit].forEach(input => {
    input.addEventListener('input', convertUnits);
    input.addEventListener('change', convertUnits);
});

// Initial conversion on load
convertUnits();