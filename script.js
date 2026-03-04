// ================================
// OpenWeatherMap API Key
// ================================
const apiKey = "YOUR_API_KEY_HERE"; // <-- replace with your API key

// ================================
// Main function (button click)
// ================================
function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value.trim();
  const errorEl = document.getElementById("error");

  if (city === "") {
    errorEl.textContent = "Please enter a city name";
    return;
  }

  errorEl.textContent = "";

  fetchCurrentWeather(city);
  fetchForecast(city);
}

// ================================
// Fetch Current Weather
// ================================
function fetchCurrentWeather(city) {
  fetch(
    https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("currentWeather").classList.remove("hidden");

      document.getElementById("cityName").textContent = data.name;
      document.getElementById(
        "temperature"
      ).textContent = 🌡 Temperature: ${data.main.temp} °C;
      document.getElementById(
        "description"
      ).textContent = ☁ Condition: ${data.weather[0].description};
      document.getElementById(
        "humidity"
      ).textContent = 💧 Humidity: ${data.main.humidity}%;
      document.getElementById(
        "wind"
      ).textContent = 🌬 Wind Speed: ${data.wind.speed} m/s;
    })
    .catch((error) => {
      document.getElementById("error").textContent = error.message;
    });
}

// ================================
// Fetch 5 Day Forecast
// ================================
function fetchForecast(city) {
  fetch(
    https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Forecast data not available");
      }
      return response.json();
    })
    .then((data) => {
      const forecastContainer = document.getElementById("forecast");
      const forecastTitle = document.getElementById("forecastTitle");

      forecastContainer.innerHTML = "";
      forecastTitle.classList.remove("hidden");

      // Filter one forecast per day (12:00 PM)
      const dailyForecasts = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      dailyForecasts.forEach((item) => {
        const card = document.createElement("div");
        card.className = "forecast-card";

        const date = new Date(item.dt_txt).toDateString();

        card.innerHTML = `
          <strong>${date}</strong><br>
          🌡 ${item.main.temp} °C<br>
          ☁ ${item.weather[0].description}
        `;

        forecastContainer.appendChild(card);
      });
    })
    .catch((error) => {
      document.getElementById("error").textContent = error.message;
    });
}