const apiKey = "YOUR_API_KEY"; // Get your free API key from https://openweathermap.org/api

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name");
    return;
  }
  getWeather(city);
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      alert("City not found. Please check the spelling.");
      return;
    }
    const data = await res.json();
    updateWeather(data);
  } catch (error) {
    console.error(error);
    alert("Error fetching weather data");
  }
}

function updateWeather(data) {
  weatherInfo.classList.remove("hidden");

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `🌡️ ${data.main.temp} °C`;
  description.textContent = `☁️ ${data.weather[0].description}`;
  humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
  wind.textContent = `💨 Wind Speed: ${data.wind.speed} m/s`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}
