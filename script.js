const searchBox = document.querySelector('.search_box');
const searchBtn = document.querySelector('.search_btn');
const currentDay = document.querySelector('.day');
const searchedCity = document.querySelector('.city');
const tempValue = document.querySelector('.temp_value');
const tempDesc = document.querySelector('.temp_desc');
const api = {
    key: '9f3194b93838e97cb74460234c6782c9',
    url: 'https://api.openweathermap.org/data/2.5/weather'
}

function today(d) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday', 'Sunday'];

    let today = days[d.getDay()];

    return `${today}`;
}

searchBox.addEventListener('keypress', setQuery);

searchBtn.addEventListener('click', () => {
    getWeather(searchBox.value)
})

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getWeather(searchBox.value);
    }
}

function getWeather(query) {
    fetch(`${api.url}?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        let data = weather.json();
        return data;
        // console.log(data);
    })
    .then(data => {
        let now = new Date();
        currentDay.innerHTML = today(now)

        searchedCity.innerHTML = `${data.name}, ${data.sys.country}`
        // if(searchedCity !== data.name) {
        //     alert('not a city');
        // }

        tempValue.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
        tempDesc.innerHTML = `${data.weather[0].description}`
    })
}
