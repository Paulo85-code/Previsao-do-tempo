// Variáveis e seleção de elementos
const apiKey = '38cf6aa80b9bbfc9d5225a9c46446992';
const apiCountryURL = 'https://flagsapi.com/:country_code/flat/64.png';

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const umidityElement = document.querySelector('#umidity span')
const windElement = document.querySelector('#wind span')

const weatherContainer = document.querySelector('#weather-data')

// Funções

const getweatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL)
    const data = await res.json();

    return(data)
}

const showWeatherData = async (city) => {
    const data = await getweatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute('src', apiCountryURL.replace(':country_code', data.sys.country.toUpperCase()));
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}%`;

    weatherContainer.classList.remove('hide');

}

// Eventos
searchBtn.addEventListener('click', (e) => {

    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        const city = e.target.value;

        showWeatherData(city);
    }
})