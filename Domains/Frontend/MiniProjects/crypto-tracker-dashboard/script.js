const statsContainer = document.getElementById("stats");
const searchInput = document.getElementById("searchInput");
const chartCanvas = document.getElementById("priceChart");
const currencySelect = document.getElementById("currencySelect");
const themeToggle = document.getElementById("themeToggle");
const alertBox = document.getElementById("alertBox");

let cryptoChart;
let currentCurrency = "usd";
let allCoins = [];

// First call
fetchData();

// Fetch data based on currency
async function fetchData() {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&order=market_cap_desc&per_page=10&page=1&sparkline=true`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    allCoins = data;
    displayCoins(allCoins);
    drawChart(allCoins.slice(0, 3)); // Initial comparison (top 3 coins)
  } catch (err) {
    statsContainer.innerHTML = "<p style='color:red;'>Error fetching data ⚠️</p>";
  }
}

// Display coin cards
function displayCoins(coins) {
  statsContainer.innerHTML = "";
  coins.forEach((coin) => {
    const card = document.createElement("div");
    card.classList.add("coin-card");
    card.innerHTML = `
      <img src="${coin.image}" alt="${coin.name}" />
      <h3>${coin.name}</h3>
      <p>Symbol: ${coin.symbol.toUpperCase()}</p>
      <p>💰 Price: ${currentCurrency === "usd" ? "$" : "₹"}${coin.current_price.toLocaleString()}</p>
      <p>📈 24h: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
      <p>Rank: #${coin.market_cap_rank}</p>
    `;
    card.addEventListener("click", () => drawChart([coin]));
    statsContainer.appendChild(card);
    simulateAlert(coin);
  });
}

// Draw comparison chart (supports multiple coins)
function drawChart(coins) {
  const datasets = coins.map((coin) => ({
    label: `${coin.name}`,
    data: coin.sparkline_in_7d.price,
    borderColor: randomColor(),
    borderWidth: 2,
    fill: false,
    tension: 0.3
  }));

  const labels = Array.from({ length: coins[0].sparkline_in_7d.price.length }, (_, i) => i + 1);
  if (cryptoChart) cryptoChart.destroy();

  cryptoChart = new Chart(chartCanvas, {
    type: "line",
    data: { labels, datasets },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: getComputedStyle(document.body).getPropertyValue("--text") } }
      },
      scales: {
        x: { display: false },
        y: {
          ticks: { color: getComputedStyle(document.body).getPropertyValue("--muted") },
          grid: { color: getComputedStyle(document.body).getPropertyValue("--card-bg") }
        }
      }
    }
  });
}

// Search
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = allCoins.filter(c => c.name.toLowerCase().includes(query));
  displayCoins(filtered.length ? filtered : allCoins);
});

// Currency switch
currencySelect.addEventListener("change", () => {
  currentCurrency = currencySelect.value;
  fetchData();
  showAlert(`Currency switched to ${currentCurrency.toUpperCase()}`);
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const mode = document.body.classList.contains("light") ? "Light" : "Dark";
  themeToggle.textContent = mode === "Light" ? "☀️ Light Mode" : "🌙 Dark Mode";
  showAlert(`${mode} theme activated`);
  drawChart(allCoins.slice(0, 3)); // re‑render chart for theme contrast
});

// Simulated price alert when 24h change more than 5%
function simulateAlert(coin) {
  if (Math.abs(coin.price_change_percentage_24h) > 5) {
    showAlert(`${coin.name} price moved ${coin.price_change_percentage_24h.toFixed(2)}%! 🚨`);
  }
}

// Alert box popup
function showAlert(text) {
  alertBox.textContent = text;
  alertBox.classList.remove("hidden");
  setTimeout(() => { alertBox.classList.add("hidden"); }, 4000);
}

// Random color for comparison lines
function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}

// Auto refresh every minute
setInterval(fetchData, 60000);