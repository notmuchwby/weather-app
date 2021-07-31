const searchBar = document.querySelector('#search');
searchBar.placeholder = "Enter the city here";
const btnSearch = document.querySelector('button');
const displayWeather = document.querySelector('#display-weather');

// DISPLAY ITEMS 
const cityName = document.createElement('p'); 
cityName.id = "main-items";
cityName.className = "first-item";
const celsiusTemp = document.createElement('p');
celsiusTemp.id = "main-items";
const feelsLikeCelsiusTemp = document.createElement('p');
feelsLikeCelsiusTemp.id = "secondary-items";
const humidity = document.createElement('p');
humidity.id = "secondary-items";
const pressure = document.createElement('p');
pressure.id = "secondary-items";
const weather = document.createElement('p');
weather.id = "secondary-items";
weather.className = "capitalize";
const changeMeasureUnitBtn = document.createElement('button');
changeMeasureUnitBtn.id = "change-measure-btn";
const additionalInfo = document.createElement('div');
additionalInfo.id = "additional-info";

displayWeather.appendChild(cityName);
displayWeather.appendChild(celsiusTemp);
displayWeather.appendChild(additionalInfo);
additionalInfo.appendChild(feelsLikeCelsiusTemp);
additionalInfo.appendChild(weather);
additionalInfo.appendChild(humidity);
additionalInfo.appendChild(pressure);
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
        console.log(response)
        cityName.innerHTML = "London, UK"
        changeMeasureUnitBtn.innerHTML = "°F"
        celsiusTemp.innerHTML = parseInt(response.main.temp - 273.15) + "°C";
        feelsLikeCelsiusTemp.innerHTML = "Feels like: " + parseInt(response.main.feels_like - 273.15) + "°C";
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
            cityName.innerHTML = searchBar.value.toLowerCase() + ", " + response.sys.country;
            searchBar.value = "";

            celsiusTemp.innerHTML = parseInt(response.main.temp - 273.15) + "°C";
            feelsLikeCelsiusTemp.innerHTML = "Feels like: " + parseInt(response.main.feels_like - 273.15) + "°C";
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
        if(changeMeasureUnitBtn.innerHTML === "°F") {
            celsiusTemp.innerHTML = parseInt(tempValue * 9 / 5 - 459.67) + "°F";
            feelsLikeCelsiusTemp.innerHTML = "Feels like: " + parseInt(feelsLikeTempValue * 9 / 5 - 459.67) + "°F";
            changeMeasureUnitBtn.innerHTML = "°C";
        } else if(changeMeasureUnitBtn.innerHTML === "°C") {
            celsiusTemp.innerHTML = parseInt(tempValue - 273.15) + "°C";
             feelsLikeCelsiusTemp.innerHTML = "Feels like: " + parseInt(tempValue - 273.15) + "°C";
             changeMeasureUnitBtn.innerHTML = "°F";
        }
    })
}

frontPage();
changeUnit();



