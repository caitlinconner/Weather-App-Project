const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIkey = '096f88cbd992a6abd15a57aa0816b115';
    const city =  document.querySelector('.search-box input').value;

    if(city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`)
    .then(response => response.json())
    .then(json => {
        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }
        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main){
            case 'Clear':
                image.src = 'file:///C:/Users/caitl/Downloads/pexels-pixabay-53594.jpg';
                break;

            case 'Rain':
                image.src = 'file:///C:/Users/caitl/Downloads/pexels-ave-calvar-martinez-3497624.jpg';
                break;

            case 'Snow':
                image.src = 'file:///C:/Users/caitl/Downloads/pexels-magda-ehlers-714482.jpg';
                break;

            case 'Clouds':
                image.src = 'file:///C:/Users/caitl/Downloads/pexels-pixabay-414634.jpg';
                break;

            case 'Haze':
                image.src = 'file:///C:/Users/caitl/Downloads/pexels-karol-wi%C5%9Bniewski-845619.jpg';
                break;

            default:
                image.src = '';
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}mph`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    });
});