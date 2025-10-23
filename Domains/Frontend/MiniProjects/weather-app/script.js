<<<<<<< HEAD
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
=======
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfoDiv = document.getElementById('weather-info');

// IMPORTANT: Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = 'YOUR_API_KEY'; 

async function getWeather() {
    const city = cityInput.value.trim();
    if (city === '') {
        weatherInfoDiv.innerHTML = '<p class="error">Please enter a city name.</p>';
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Use metric units for Celsius

    try {
        weatherInfoDiv.innerHTML = '<p>Loading...</p>'; // Show loading state
        const response = await fetch(apiUrl);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found.');
            } else {
                throw new Error(`Error fetching weather: ${response.statusText}`);
            }
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherInfoDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const temp = main.temp;
    const description = weather[0].description;
    const icon = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    weatherInfoDiv.innerHTML = `
        <h2>${name}</h2>
        <img src="${iconUrl}" alt="${description}" class="weather-icon">
        <p>${Math.round(temp)}°C</p> 
        <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p> 
    `;
}

searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});
>>>>>>> main
