const originalInput = document.getElementById("original");
const discountInput = document.getElementById("discount");
const finalOutput = document.getElementById("final");
const calculateBtn = document.getElementById("calculate");

calculateBtn.addEventListener("click", function () {
  const originalPrice = parseFloat(originalInput.value);
  const discount = parseFloat(discountInput.value);

  if (isNaN(originalPrice) || isNaN(discount)) {
    alert("Please enter valid numbers for both fields!");
    return;
  }

  if (discount < 0 || discount > 100) {
    alert("Discount should be between 0% and 100%!");
    return;
  }

  const finalPrice = originalPrice - (originalPrice * discount) / 100;
  finalOutput.textContent = "₹" + finalPrice.toFixed(2);
});
