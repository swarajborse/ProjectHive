// script.js

const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const calculateBtn = document.getElementById("calculateBtn");
const bmiValue = document.getElementById("bmiValue");
const bmiCategory = document.getElementById("bmiCategory");
const resultDiv = document.getElementById("result");
const themeToggle = document.getElementById("themeToggle");

// Dark/Light mode
function initTheme() {
  const saved = localStorage.getItem("bmi_theme");
  if(saved==="dark") document.body.classList.add("dark"), themeToggle.checked=true;
}
initTheme();

themeToggle.addEventListener("change", () => {
  if(themeToggle.checked){
    document.body.classList.add("dark");
    localStorage.setItem("bmi_theme","dark");
  }else{
    document.body.classList.remove("dark");
    localStorage.setItem("bmi_theme","light");
  }
});

// BMI Calculation
function calculateBMI(){
  const weight = parseFloat(weightInput.value);
  const heightCm = parseFloat(heightInput.value);
  if(!weight || !heightCm){
    alert("Please enter valid weight and height");
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  const roundedBMI = bmi.toFixed(1);
  bmiValue.textContent = roundedBMI;

  let category = "";
  let color = "";

  if(bmi<18.5){category="Underweight"; color="#ffd86b";}
  else if(bmi<25){category="Normal"; color="#7cf59b";}
  else if(bmi<30){category="Overweight"; color="#ffb86b";}
  else{category="Obese"; color="#ff5f5f";}

  bmiCategory.textContent = category;
  resultDiv.style.color = color;

  // Simple animation
  resultDiv.style.transform="scale(1.1)";
  setTimeout(()=>resultDiv.style.transform="scale(1)",300);
}

calculateBtn.addEventListener("click", calculateBMI);
