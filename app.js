let cityName = document.querySelector(".city-name");
let temperature = document.querySelector(".temp");
let conditionsIcon = document.querySelector(".conditions-icon");
let conditions = document.querySelector(".conditions");
let feelsLike = document.querySelector(".feels-like-value");
let humidity = document.querySelector(".humidity-value");
let windSpeed = document.querySelector(".wind-speed-value");
let localTime = document.querySelector(".local-time")
let twentyFourHourForecastData = document.querySelector(
  ".twenty-four-hour-forecast-data"
);

async function getWeatherData(city) {
    let searchedCity = city
  const response = await fetch(
    "http://api.weatherapi.com/v1/forecast.json?key=207599b971564ec4905144139242606&q=" + searchedCity + "&days=3&aqi=yes&alerts=yes",
    { mode: "cors" }
  );
  const weatherData = await response.json();
  cityName.innerHTML = weatherData.location.name + ", " + weatherData.location.region + ", " + weatherData.location.country
  temperature.innerHTML = weatherData.current.temp_f + "ºF"
  conditionsIcon.src = weatherData.current.condition.icon
  conditions.innerHTML = weatherData.current.condition.text
  feelsLike.innerHTML = weatherData.current.feelslike_f + "ºF"
  humidity.innerHTML = weatherData.current.humidity + "%"
  windSpeed.innerHTML = weatherData.current.wind_mph + " mph"
  localTime.innerHTML = "Local Time: " + weatherData.location.localtime.slice(weatherData.location.localtime.length-5,weatherData.location.localtime.length)
  getTwentyFourHourForecast(weatherData)
}

let city = 'Chicago'
getWeatherData(city)

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var searchText = document.getElementById('searchInput').value;
    getWeatherData(searchText)
});

async function getTwentyFourHourForecast(weatherData) {
    let forecast = weatherData
    let counter = 0
    let twentyfourhourforecast = []
    forecast.forecast.forecastday[0].hour.forEach((element) => {
      if (element.time > forecast.location.localtime) {
        twentyfourhourforecast.push(element)
      }
    });
    if (counter < 24) {
        forecast.forecast.forecastday[1].hour.forEach((element) => {
            if (element.time > forecast.location.localtime) {
              twentyfourhourforecast.push(element)
            }
          });
    }
    
    twentyfourhourforecast = twentyfourhourforecast.slice(0,24)

    while (twentyFourHourForecastData.firstChild) {
        twentyFourHourForecastData.removeChild(twentyFourHourForecastData.firstChild);
    }
    
    twentyfourhourforecast.forEach(element => {
        let time = element.time
        time = time.slice(time.length-5,time.length)
    
        let temperature = element.temp_f
    
        let condition = element.condition.icon
    
        let forecastHourContainer = document.createElement('div')
        forecastHourContainer.classList.add('forecast-hour-container')
        let forecastHourTime = document.createElement('div')
        forecastHourTime.innerHTML = time
        let forecastHourTemperature = document.createElement('div')
        forecastHourTemperature.innerHTML = temperature + "ºF"
        let forecastHourCondition = document.createElement('img')
        forecastHourCondition.src = condition
    
        forecastHourContainer.append(forecastHourTime)
        forecastHourContainer.append(forecastHourTemperature)
        forecastHourContainer.append(forecastHourCondition)
        twentyFourHourForecastData.append(forecastHourContainer)
    });    
}


