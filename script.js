const searchBox = document.querySelector('.search_box');
const searchBtn = document.querySelector('.search_btn');
const currentDay = document.querySelector('.day');
const searchedCity = document.querySelector('.city');
const tempValue = document.querySelector('.temp_value');
const tempDesc = document.querySelector('.temp_desc');
const title = document.querySelector('.title');
const api = {
    key: '9f3194b93838e97cb74460234c6782c9',
    url: 'https://api.openweathermap.org/data/2.5/weather'
}

// GET CURRENT DAY

function today(d) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday', 'Sunday'];

    let today = days[d.getDay()];

    return `${today}`;
}

// EVENT HANDLERS

searchBtn.addEventListener('click', () => {
    getWeather(searchBox.value);
})

searchBox.addEventListener('keypress', setQuery);

// SETQUERY FUNCTION EXECUTED

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getWeather(searchBox.value);
    }
}

// API GET REQUEST FROM THE SERVER

function getWeather(query) {
    fetch(`${api.url}?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        let data = weather.json();
        return data;
        // console.log(data);
    })
    .then(data => {
        let now = new Date();

        currentDay.innerHTML = today(now);
        searchedCity.innerHTML = `${data.name}, ${data.sys.country}`
        tempValue.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
        tempDesc.innerHTML = `${data.weather[0].description}`
    })
}
