document.addEventListener('DOMContentLoaded', () => {
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');
    const directionSelect = document.getElementById('direction');
    const generateBtn = document.getElementById('generate-btn');
    const gradientPreview = document.querySelector('.gradient-preview');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-btn');
    const gradientTypeSelect = document.getElementById('gradient-type');
    const addColorStopBtn = document.getElementById('add-color-stop');
    const colorStopsContainer = document.getElementById('color-stops-container');
    const randomBtn = document.getElementById('random-btn');

    let colorStops = [];

    function updateGradient() {
        const gradientType = gradientTypeSelect.value;
        const colors = [color1Input.value, ...colorStops.map(cs => cs.input.value), color2Input.value];
        const direction = directionSelect.value;

        let gradientCSS;
        if (gradientType === 'linear') {
            gradientCSS = `linear-gradient(${direction}, ${colors.join(', ')})`;
        } else {
            // For radial, direction can be 'circle at center', 'ellipse at center', etc. or just 'circle', 'ellipse'
            // For simplicity, we'll use 'circle at center' for now or just omit if direction is not shape-based
            const radialShape = direction.includes('deg') ? 'circle' : direction; // Simple heuristic
            gradientCSS = `radial-gradient(${radialShape}, ${colors.join(', ')})`;
        }
        
        gradientPreview.style.background = gradientCSS;
        cssOutput.value = `background: ${gradientCSS};`;
    }

    function addColorStop() {
        const newColorStop = {
            id: `color-stop-${colorStops.length}`,
            input: document.createElement('input'),
            removeBtn: document.createElement('button')
        };

        newColorStop.input.type = 'color';
        newColorStop.input.value = '#ffffff'; // Default to white
        newColorStop.input.addEventListener('input', updateGradient);

        newColorStop.removeBtn.textContent = 'X';
        newColorStop.removeBtn.className = 'remove-color-stop';
        newColorStop.removeBtn.onclick = () => {
            colorStopsContainer.removeChild(newColorStop.input);
            colorStopsContainer.removeChild(newColorStop.removeBtn);
            colorStops = colorStops.filter(cs => cs.id !== newColorStop.id);
            updateGradient();
        };

        colorStopsContainer.appendChild(newColorStop.input);
        colorStopsContainer.appendChild(newColorStop.removeBtn);
        colorStops.push(newColorStop);
        updateGradient();
    }

    function generateRandomColor() {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        return randomColor.padEnd(7, '0'); // Ensure 6 characters
    }

    function generateRandomGradient() {
        color1Input.value = generateRandomColor();
        color2Input.value = generateRandomColor();

        // Clear existing color stops
        colorStops.forEach(cs => {
            colorStopsContainer.removeChild(cs.input);
            colorStopsContainer.removeChild(cs.removeBtn);
        });
        colorStops = [];

        // Add 0-2 random color stops
        const numRandomStops = Math.floor(Math.random() * 3); // 0, 1, or 2
        for (let i = 0; i < numRandomStops; i++) {
            addColorStop();
            colorStops[i].input.value = generateRandomColor();
        }

        const directions = ['to right', 'to left', 'to top', 'to bottom', '45deg', '90deg', '135deg', '180deg'];
        directionSelect.value = directions[Math.floor(Math.random() * directions.length)];

        const gradientTypes = ['linear', 'radial'];
        gradientTypeSelect.value = gradientTypes[Math.floor(Math.random() * gradientTypes.length)];

        updateGradient();
    }

    // Initial gradient update
    updateGradient();

    color1Input.addEventListener('input', updateGradient);
    color2Input.addEventListener('input', updateGradient);
    directionSelect.addEventListener('change', updateGradient);
    gradientTypeSelect.addEventListener('change', updateGradient);
    generateBtn.addEventListener('click', updateGradient);
    addColorStopBtn.addEventListener('click', addColorStop);
    randomBtn.addEventListener('click', generateRandomGradient);

    copyBtn.addEventListener('click', () => {
        cssOutput.select();
        document.execCommand('copy');
        alert('CSS copied to clipboard!');
    });
});