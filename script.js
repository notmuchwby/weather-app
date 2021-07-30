const searchBar = document.querySelector('#search');
searchBar.placeholder = "Enter the city here";
const btnSearch = document.querySelector('button');
const displayWeather = document.querySelector('#display-weather');

// DISPLAY ITEMS 
const cityName = document.createElement('p'); 
cityName.className = "capitalize";
const celsiusTemp = document.createElement('p');
const feelsLikeCelsiusTemp = document.createElement('p');
const humidity = document.createElement('p');
const pressure = document.createElement('p');
const weather = document.createElement('p');
weather.className = "capitalize";
const changeMeasureUnitBtn = document.createElement('button');

displayWeather.appendChild(cityName);
displayWeather.appendChild(celsiusTemp);
displayWeather.appendChild(feelsLikeCelsiusTemp);
displayWeather.appendChild(weather);
displayWeather.appendChild(humidity);
displayWeather.appendChild(pressure);
displayWeather.appendChild(changeMeasureUnitBtn);

let tempValue;
let feelsLikeTempValue;
let humidityValue;
let pressureValue;

// STARTING FRONT PAGE
function frontPage() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London&APPID=11d41e1187f2d8a2f0def5c8b6be1eac', {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        cityName.innerHTML = "London"
        changeMeasureUnitBtn.innerHTML = "F"
        celsiusTemp.innerHTML = "Temperature in celsius: " + parseInt(response.main.temp - 273.15);
        feelsLikeCelsiusTemp.innerHTML = "Feels like in celsuis: " + parseInt(response.main.feels_like - 273.15);
        humidity.innerHTML = "Humidity: " + response.main.humidity;
        pressure.innerHTML = "Pressure: " + response.main.pressure;
        weather.innerHTML = response.weather[0].description;

        tempValue = response.main.temp;
        feelsLikeTempValue = response.main.feels_like;
        humidityValue = response.main.humidity;
        pressureValue = response.main.pressure;
    })
}

// AFTER THE CITY SEARCH
btnSearch.addEventListener('click', () => {
    const api = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchBar.value + '&APPID=11d41e1187f2d8a2f0def5c8b6be1eac';
    
    fetch(api, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        if(response.cod !== "404" && response.cod !== "400") {
            cityName.innerHTML = searchBar.value.toLowerCase();
            searchBar.value = "";

            celsiusTemp.innerHTML = "Temperature in celsius: " + parseInt(response.main.temp - 273.15);
            feelsLikeCelsiusTemp.innerHTML = "Feels like in celsuis: " + parseInt(response.main.feels_like - 273.15);
            humidity.innerHTML = "Humidity: " + response.main.humidity;
            pressure.innerHTML = "Pressure: " + response.main.pressure;
            weather.innerHTML = response.weather[0].description;

            tempValue = response.main.temp;
            feelsLikeTempValue = response.main.feels_like;
            humidityValue = response.main.humidity;
            pressureValue = response.main.pressure;
        }
    })
    .catch(function(error) {
        
    });

    
})

// SWICHING FROM FAHRENHEIT TO CELSIUS & VICE VERSA
function changeUnit() {
    changeMeasureUnitBtn.addEventListener('click', () => {
        if(changeMeasureUnitBtn.innerHTML === "F") {
            celsiusTemp.innerHTML = "Temperature in fahrenheit: " + parseInt(tempValue * 9 / 5 - 459.67);
            feelsLikeCelsiusTemp.innerHTML = "Feels like in fahrenheit: " + parseInt(feelsLikeTempValue * 9 / 5 - 459.67);
            changeMeasureUnitBtn.innerHTML = "C";
        } else if(changeMeasureUnitBtn.innerHTML === "C") {
            celsiusTemp.innerHTML = "Temperature in celsius: " + parseInt(tempValue - 273.15);
             feelsLikeCelsiusTemp.innerHTML = "Feels like in celsuis: " + parseInt(tempValue - 273.15);
             changeMeasureUnitBtn.innerHTML = "F";
        }
    })
}

frontPage();
changeUnit();



