// const apiKey = 'f3b3299107c49c7e27178ee9d98bab70';
// const searchBtn = document.getElementById('searchBtn');
// const cityInput = document.getElementById('cityInput');
// const currentWeather = document.getElementById('currentWeather');
// const forecast = document.getElementById('forecast');

// // Function to fetch current weather data
// async function getCurrentWeather(city) {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('City not found');
//         }
//         const data = await response.json();
//         displayCurrentWeather(data);
//     } catch (error) {
//         currentWeather.textContent = error.message;
//     }
// }

// // Function to fetch 5-day forecast data
// async function getForecast(city) {
//     const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('City not found');
//         }
//         const data = await response.json();
//         displayForecast(data);
//         localStorage.setItem('lastCity', city);
//     } catch (error) {
//         forecast.textContent = error.message;
//     }
// }

// // Function to display current weather data
// function displayCurrentWeather(data) {
//     const { name, main, weather } = data;
//     currentWeather.textContent = `City: ${name}, Temp: ${main.temp}°C, Weather: ${weather[0].description}`;
// }

// // Function to display 5-day forecast data
// function displayForecast(data) {
//     forecast.innerHTML = '';
//     const forecastList = data.list;
//     for (let i = 0; i < forecastList.length; i += 8) {  // Every 8th item represents a new day
//         const item = forecastList[i];
//         const date = new Date(item.dt * 1000).toLocaleDateString();
//         const temp = item.main.temp;
//         const description = item.weather[0].description;
//         const forecastItem = document.createElement('div');
//         forecastItem.className = 'forecast-item';
//         forecastItem.textContent = `Date: ${date}, Temp: ${temp}°C, Weather: ${description}`;
//         forecast.appendChild(forecastItem);
//     }
// }

// // Event listener for the search button
// searchBtn.addEventListener('click', () => {
//     const city = cityInput.value;
//     if (city) {
//         getCurrentWeather(city);
//         getForecast(city);
//     }
// });

// // Load the last searched city on page load
// window.addEventListener('load', () => {
//     const lastCity = localStorage.getItem('lastCity');
//     if (lastCity) {
//         getCurrentWeather(lastCity);
//         getForecast(lastCity);
//     }
// });




const apiKey = 'f3b3299107c49c7e27178ee9d98bab70';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const currentWeather = document.getElementById('currentWeather');
const forecast = document.getElementById('forecast');

// Function to fetch current weather data
async function getCurrentWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        currentWeather.textContent = error.message;
    }
}

// Function to fetch 5-day forecast data
async function getForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayForecast(data);
        localStorage.setItem('lastCity', city);
    } catch (error) {
        forecast.textContent = error.message;
    }
}

// Function to display current weather data
function displayCurrentWeather(data) {
    const { name, main, weather } = data;
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    currentWeather.innerHTML = `
        <p>City: ${name}</p>
        <p>Temp: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <img src="${weatherIconUrl}" alt="${weather[0].description}">
    `;
}

// Function to display 5-day forecast data
function displayForecast(data) {
    forecast.innerHTML = '';
    const forecastList = data.list;
    for (let i = 0; i < forecastList.length; i += 8) {  // Every 8th item represents a new day
        const item = forecastList[i];
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const temp = item.main.temp;
        const description = item.weather[0].description;
        const weatherIconUrl = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
           <strong><p>Date: ${date}, Temp: ${temp}°C, Weather: ${description}</p></strong>
           
            <img src="${weatherIconUrl}" alt="${description}">
        `;
        forecast.appendChild(forecastItem);
    }
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getCurrentWeather(city);
        getForecast(city);
    }
});

// Load the last searched city on page load
    window.addEventListener('load', () => {
        const lastCity = localStorage.getItem('lastCity');
        if (lastCity) {
            getCurrentWeather(lastCity);
            getForecast(lastCity);
        }
    });