// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // Get all necessary elements from the DOM
    const bmiForm = document.getElementById("bmi-form");
    const weightInput = document.getElementById("weight");
    const heightInput = document.getElementById("height");
    const errorMessage = document.getElementById("error-message");
    
    const resultCard = document.getElementById("result-card");
    const bmiValueEl = document.getElementById("bmi-value");
    const bmiCategoryEl = document.getElementById("bmi-category");

    // Listen for the form submission
    bmiForm.addEventListener("submit", (event) => {
        // Prevent the form from actually submitting (which reloads the page)
        event.preventDefault();

        // Get and parse the values
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);

        // --- Input Validation ---
        // Check if values are not numbers, or are less than or equal to zero
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            // Show the error message
            errorMessage.textContent = "Please enter valid positive numbers for weight and height.";
            errorMessage.classList.remove("d-none");
            
            // Hide the result card
            resultCard.classList.add("d-none");
            return; // Stop the function
        }

        // If validation passes, hide the error message
        errorMessage.classList.add("d-none");

        // --- BMI Calculation ---
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        const roundedBMI = bmi.toFixed(1); // Round to one decimal place

        // --- Determine Category ---
        let category = "";
        let categoryClass = "";

        if (bmi < 18.5) {
            category = "Underweight";
            categoryClass = "text-underweight"; // Custom class from styles.css
        } else if (bmi < 25) {
            category = "Normal";
            categoryClass = "text-normal";
        } else if (bmi < 30) {
            category = "Overweight";
            categoryClass = "text-overweight";
        } else {
            category = "Obese";
            categoryClass = "text-obese";
        }

        // --- Display Results ---
        bmiValueEl.textContent = roundedBMI;
        bmiCategoryEl.textContent = category;
        
        // Update the category element's classes
        // We reset the class list and add the new ones
        bmiCategoryEl.className = "h4"; // Base class
        bmiCategoryEl.classList.add(categoryClass);

        // Show the result card
        resultCard.classList.remove("d-none");
    });
});

