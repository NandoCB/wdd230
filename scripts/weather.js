const container = document.querySelector('.weather__container');
const search = document.querySelector('.weather__container__searchBox button');
const weatherBox = document.querySelector('.weather__box');
const weatherDetails = document.querySelector('.weather__details');
const error404 = document.querySelector('.weather__notFound');

search.addEventListener('click', () =>{

const APIKey = '85ffde7a1e8062ff36464473683e650c';
const city = document.querySelector('.weather__container__searchBox input').value;
//const city = 'Montevideo, Uruguay';


if(city == '')
return;

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response =>
response.json()).then(json =>{

    if (json.cod == '404'){
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
    }

        error404.style.display = 'none';

        const image = document.querySelector('.weather__box img');
        const temperature = document.querySelector('.weather__box .temperature');
        const description = document.querySelector('.weather__box .description');
        const feelsLike = document.querySelector('.weather__details .weather__details__feelsLike span');
        const humidity = document.querySelector('.weather__details .weather__details__humidity span');
        const wind = document.querySelector('.weather__details .weather__details__wind span');

        switch(json.weather[0].main){

            case 'Clear':
                image.src = 'images/clear.png';
                break;
            
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;

            case 'Haze':
                image.src = 'images/mist.png';
                break;

            case 'Rain':
                image.src = 'images/rain.png';
                break;

            case 'Snow':
                image.src = 'images/snow.png';
                break;

            default:
                image.src='';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
        feelsLike.innerHTML = `${parseInt(json.main.feels_like)} <span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;


        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';

    })

})