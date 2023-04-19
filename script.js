var APIKey = "83a1b50101d0922adbf7df1b87997fb9"
var currentWeather = document.querySelector('#currentWeather');
var currentDay = document.querySelector('.today');
var weatherIcon = document.querySelector('#icon');
var todayTemp = document.querySelector('#currentTemp');
var todayWind = document.querySelector('#currentWind');
var todayHumidity = document.querySelector('#currentHumidity');
var fiveDayCast = document.querySelector('#fiveDayCast');
var fiveDayForecast = document.querySelector('#forecast');
var fiveDayTemp = document.querySelector('#weekTemp');
var fiveDayWind = document.querySelector('#weekWind');
var fiveDayHumidity = document.querySelector('#weekHumidity');
var search = document.querySelector('#search-input');
var cityInput = document.querySelector('#inputValue');
var historyCtn = document.getElementById('historyCtn');
var searchHistory = document.getElementById('history');

search.addEventListener('click', (e) => {
    e.preventDefault();
    var city = cityInput.value;
    console.log(city);
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        currentWeather.textContent = data.name;
        weatherIcon.src = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`;
        todayTemp.textContent = `Temp: ${data.main.temp} °F`;
        todayWind.textContent = `Wind: ${data.wind.speed} MPH`;
        todayHumidity.textContent = `Humidity: ${data.main.humidity} %`;
    })
    var city = cityInput.value;
    var requestForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`;
    fetch(requestForecast)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        $('#forecast').html('');
        for(var i = 0; i < 5; i++) {
            var forecast = {
                day: data.list[i].dt,
                icon: data.list[i].weather[0].icon,
                weekTemp: data.list[i].main.temp,
                weekWind: data.list[i].wind.speed,
                weekHumidity: data.list[i].main.humidity,
            }
var forecastDay = i * 8 + 4;
var fiveDay = new Date(data.list[forecastDay].dt * 1000);
console.log(fiveDay.toLocaleDateString("en-US"));
var newDate = dayjs(fiveDay).format("MM/DD");
var iconUrl = `<img src="https://openweathermap.org/img/wn/${forecast.icon}.png"/>`;
var fiveDayCast = $(`
    <div class="container text-black">
        <div class="row align-tems-start">
            <div class="col">${newDate}</div>
            <div class="col">${iconUrl}</div>
            <div class="col">Temp: ${forecast.weekTemp}°F</div>
            <div class="col">Wind: ${forecast.weekWind}MPH</div>
            <div class="col">Humidity: ${forecast.weekHumidity}%</div>
        </div>
    </div>
`);
// apend to html
$('#forecast').append(fiveDayCast);
        }
    });
});
// display today
var todayDate = dayjs();
$('.today').text(todayDate.format('MMMM D, YYYY'))

search.addEventListener("click", function() {
    const searchInput = cityInput.value;
    localStorage.setItem("cities", searchInput);
    const searchItem = document.createElement("li");
    searchItem.textContent = searchInput;
    historyCtn.appendChild(searchItem);
});
if(localStorage.getItem("cities")) {
    cityInput.value = localStorage.getItem("cities");
    const searchItem = document.createElement("li");
    searchItem.textContent = localStorage.getItem("cities");
    historyCtn.appendChild(searchItem);
}