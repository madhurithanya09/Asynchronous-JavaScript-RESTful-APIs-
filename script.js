const API_KEY = "51c9f82733b6db7353292f55c01a5335";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const condition = document.getElementById("condition");

async function fetchWeather(city) {

    try {

        loading.classList.remove("hidden");
        weatherCard.classList.add("hidden");
        errorBox.classList.add("hidden");

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {

            if (response.status === 404) {
                throw new Error("City not found");
            }

            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {

        showError(error.message);

    } finally {

        loading.classList.add("hidden");
    }
}

function displayWeather(data) {

    /*
      Example JSON Structure:

      data.main.temp
      data.main.humidity
      data.wind.speed
      data.weather[0].description
    */

    cityName.textContent =
        `${data.name}, ${data.sys.country}`;

    temperature.textContent =
        `${data.main.temp} °C`;

    humidity.textContent =
        `${data.main.humidity}%`;

    windSpeed.textContent =
        `${data.wind.speed} m/s`;

    condition.textContent =
        data.weather[0].description;

    weatherCard.classList.remove("hidden");
}

function showError(message) {

    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (!city) {
        showError("Please enter a city name");
        return;
    }

    fetchWeather(city);
});

cityInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {

        const city = cityInput.value.trim();

        if (!city) {
            showError("Please enter a city name");
            return;
        }

        fetchWeather(city);
    }
});
