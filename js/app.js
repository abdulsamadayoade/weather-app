// VARIABLES
const searchField = document.getElementById('search');
const searchBtn = document.querySelector('.nav__search--btn');
const errorText = document.getElementById('error-text');
const closeSearch = document.querySelector('.close-search');
const contentRight = document.querySelector('.content__right');
const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const api_key = "&appid=ed8f365451589d3c93eeeace0e21276d";

// SHOW THE CLEAR ICON AFTER THE USER START TYPING
searchField.addEventListener('keyup', () => {
    closeSearch.style.display = 'block';
});

// CLEAR THE INPUT FIELD AND REMOVE THE CLEAR ICON
closeSearch.addEventListener('click', () => {
    document.getElementById('search').value = '';
    closeSearch.style.display = 'none';
})

let city;
searchCity = () => {
    let searchValue = searchField.value;

    if (searchValue === '') {
        errorText.style.display = 'block';
    }

    else {
        errorText.style.display = 'none';
        city = searchValue;

        const completeUrl = url + city + api_key;

        fetch(completeUrl)
        .then((response) => response.json())
        .then((result) => {
            if(result.cod == 404) {
                errorSection.style.display = 'flex';
            } else {
                contentRight.style.backgroundColor = '#56c2e6';
                setCity(result.name);
                setTempC(result.main.temp);
                setTempF(result.main.temp);
                setWeatherType(result.weather[0].main);
                setWeatherDesc(result.weather[0].description);
                setTime();
                setCountry(result.sys.country);
                setHumidity(result.main.humidity);
                setWindPressure(result.main.pressure);
                setWindSpeed(result.wind.speed);
                setWindDegree(result.wind.deg);
                setTempMax(result.main.temp_max);
                setTempMin(result.main.temp_min);
            }
        })
    }
}

searchBtn.addEventListener('click', searchCity);

// SEARCH FUNCTIONALITY WHEN THE ENTER KEY IS PRESSED IN THE SEARCH BOX
function searchFunc(e) {
    if (e.keyCode == 13) {
        searchCity();
    }
}

// SET CITY NAME
setCity = (el) => {
    document.querySelector('.content__city').innerHTML = el;
}

// SET TEMPRATURE IN CELSIUS
setTempC = (el) => {
    // CONVERT TEMPERATURE IN KELVIN TO CELSIUS
    let tempCel = Math.floor(el - 273);
    document.querySelector('.content__celsius').innerHTML = tempCel + ' C';
}

// SET TEMPERATURE IN FAHRENHEIT
setTempF = (el) => {
    // CONVERT TEMPERATURE IN KELVIN TO FAHRENHEIT
    const tempF = Math.floor(9/5 * (el -273) + 32);
    document.querySelector('.content__fahrenheit').innerHTML = tempF + ' F';
}

// SET WEATHER TYPE
setWeatherType = (el) => {
    document.querySelector('.content__type').innerHTML = el;
}

// SET WEATHER DESCRIPTION
setWeatherDesc = (el) => {
    document.querySelector('.content__description').innerHTML = el;
}

// SET TIME
setTime = () => {
    const time = new Date();
    const hours = time.getHours() % 12;
    document.querySelector('.content__updatedTime').innerHTML = 'Updated on: '+ hours + ':' + time.getMinutes() + ':' + time.getSeconds();
}

// SET COUNTRY CODE
setCountry = (el) => {
    document.querySelector('.content__country').innerHTML = 'Country Code: ' + el;
}

// SET HUMIDITY
setHumidity = (el) => {
    document.querySelector('.content__humidity').innerHTML = 'Humidity: ' + el;
}

// SET WIND PRESSURE
setWindPressure = (el) => {
    document.querySelector('.content__wind-pressure').innerHTML = 'Wind Pressure: ' + el;
}

// SET WIND SPEED
setWindSpeed = (el) => {
    document.querySelector('.content__wind-speed').innerHTML = 'Wind Speed: ' + el;
}

// SET WIND DEGREE
setWindDegree = (el) => {
    document.querySelector('.content__wind-degree').innerHTML = 'Wind Degree: ' + el;
}

// SET MAXIMUM TEMPERATURE
setTempMax = (el) => {
    document.querySelector('.content__temp-max').innerHTML = 'Temp. Max: '+ Math.floor((el-273)) + ' C  /  '+ Math.floor((el+-273) * 9/5) + ' F';
}

// SET MINIMUM TEMPERATURE
setTempMin = (el) => {
    document.querySelector('.content__temp-min').innerHTML = 'Temp. Min: '+ Math.floor((el-273)) + ' C  /  '+ Math.floor((el-273) * 9/5) + ' F';
}

// ERROR SECTION
const errorSection = document.querySelector('.error');
const homeBtn = document.querySelector('.go-home');

homeBtn.addEventListener('click', () => {
    errorSection.style.display = 'none';
});