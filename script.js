var apiRootUrl = "https://api.openweathermap.org"
var APIKey = "83a1b50101d0922adbf7df1b87997fb9"
var searchHistory = [];
var icon = [];

var searchInput = document.querySelector('#search-input');
var searchForm = document.querySelector('#search-form');
var forecastCtn = document.querySelector('#forecast');
var currentDay = document.querySelector('#today')
var searchHistory = document.querySelector('#history');

function renderWeather(city, weather) {
    var date = dayjs().format("MM/DD/YYYY");
    var temp = weather.main.temp;
    var wind = weather.wind.speed;
    var humidity = main.humidity;
    var iconDesc = weather.weather[0].description || weather[0].main;
    var iconUrl = "";

    var card = document.createElement("div");
    var cardMain = document.createElement("div");
    var heading = document.createElement("h2");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p");
    var iconDesc = document.createElement("img");

    card.setAttribute("class", "card");
    cardMain.setAttribute("class", "card-main");
    card.append(cardMain);

    heading.setAttribute("class", "h2 card-head");
    tempEl.setAttribute("class", "card-text");
    windEl.setAttribute("class", "card-text");
    humidityEl.setAttribute("class", "card-text");

    heading.textContent = "${city} (${date})";
    weatherIcon.setAttribute("alt", iconDesc);
    weatherIcon.setAttribute("src", iconUrl);
    weatherIcon.setAttribute("class", "weather-icon");
    heading.append(weatherIcon);
    tempEl.textContent = "Temp: ${temp}°F";
    windEl.textContent = "Wind: ${wind}MPH";
    humidityEl.textContent = "Humidity: ${humidity}%";
    cardMain.append(heading, tempEl, windEl, humidityEl);

    currentWeather.innerHTML = "";
    currentWeather.append(card);
}

//function to display card from weather api
function forecastCard(forecast) {
    var iconUrl = "";
    var iconDesc = forecast.weather[0].description;
    var temp = forecast.main.temp;
    var wind = forecast.wind.speed;
    var humidity = forecast.main.humidity;

    var col = document.createElement("div");
    var card = document.createElement("div");
    var cardMain = document.createElement("div");
    var cardHead = document.createElement("h3");
    var weatherIcon = document.createElement("img");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p");

    col.append(card);
    col.classList("five-day-forecast");
    card.append(cardMain);
    cardMain.append(weatherIcon, tempEl, windEl, humidityEl);

    card.setAttribute("class", "card text-white");
    cardMain.setAttribute("class", "card-main");
    cardHead.setAttribute("class", "card-title");
    tempEl.setAttribute("class", "card-text");
    windEl.setAttribute("class", "card-text");
    humidityEl.setAttribute("class", "card-text");

    //content inside card
    cardHead.textContent = dayjs(forecast.dt_txt).format("M/D/YYYY");
    weatherIcon.setAttribute("src", iconUrl);
    weatherIcon.setAttribute("alt", iconDesc);
    tempEl.textContent = "Temp: ${temp}°F";
    windEl.textContent = "Wind: ${wind}MPH";
    humidityEl.textContent = "Humidity: ${humidity}%";

    forecastCtn.append(col);
}

// function to display daily forecast
function renderForecast(dailyForecast) {
    var startDay = dayjs().add(1, "day").start("day").unix();
    var endDay = dayjs().add(5, "day").start("day").unix();

    var headCol = document.createElement("div");
    var heading = document.createElement("h4");

    headCol.setAttribute("class", "col");
    heading.textContent = "5-Day Forecast:";
    headCol.append(heading);

    forecastCtn.innerHTML = "";
    forecastCtn.append(headCol);

    for (var i = 0; i < dailyForecast.length; i++) {
        if (dailyForecast[i].dt >= startDay && dailyForecast[i].dt < endDay) {
        if (dailyForecast[i].dt_txt.slice(11, 13) == "12") {
            renderForecast(dailyForecast[i]);
            }
        }
    }
}

function renderSearch(city, data) {
    renderWeather(city, data.list[0], data.city.timezone);
    renderForecast(data.list);
}

//fetch weather
function fetchAPI(location) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+searchInput.value+"&appid=83a1b50101d0922adbf7df1b87997fb9"

    fetch(apiUrl)
    .then(function (res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(err) {
        console.error(err);
    });
}

function fetchCoordinates(search) {
    var apiUrl = 

    fetch(apiUrl)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            if (!data[0]) {
                alert("Location not found");
            } else {
                appendHistory(search);
                fetchWeather(data[0]);
            }
        })
        .catch(function(err) {
            console.error(err);
        });
}

// fuction for search history
function renderHistory() {
    searchHistory.innerHTML = "";

    for (var i = searchHistory.length -1; i >= 0; i--) {
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("aria-controls", "current forecast");
        btn.setClass.add("history-btn", "history-data");

        btn.setAttribute("data-search", searchHistory[i]);
        btn.textContent = searchHistory[i];
        searchHistory.append(btn);
    }
}

//locally store search history
function appendHistory(search) {
    if (searchHistory.indexOf(search) !== -1) {
        return;
    }
    searchHistory.push(search);
    localStorage.setItem("history-search", JSON.stringify(searchHistory));
    renderSearchHistory();
}

function initSearchHistory() {
    var searchedHistory = localStorage.getItem("history-search");
    if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
    }
    renderSearchHistory();
}

//error if nothing is searched
function handleSearchFormBtn(e) {
    e.preventDefault();
    if (!searchInput.value) {
        return;
    }
    fetchAPI();
    var search = searchInput.value.trim();
    searchInput.value = "";
}

searchForm.addEventListener("submit", handleSearchFormBtn);