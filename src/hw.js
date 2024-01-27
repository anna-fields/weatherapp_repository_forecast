function displaySearch (response) {
let displayTemp = document.querySelector("#tempValue");
let temp = Math.round(response.data.temperature.current);
displayTemp.innerHTML=`${temp}°C`;

let h1=document.querySelector("h1");
h1.innerHTML=response.data.city;

let iconElement=document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.condition.description;

let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML= `${response.data.temperature.humidity}% `;

let windSpeedElement = document.querySelector("#windSpeed");
windSpeedElement.innerHTML= `${response.data.wind.speed} km/h`;

getForecast(response.data.city);

}
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", search);



function search (event) {
    event.preventDefault ();
    let cityInputElement = document.querySelector("#enterCity");
    let city = cityInputElement.value;
    fetchCurrentWeather (city);
}


function fetchCurrentWeather (city){

let apiKey = "53980o1ef09d7553cet92b43aefbc155";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiURL).then(displaySearch)
}

fetchCurrentWeather("Sintra");

function getForecast (city){
  let apiKey= "53980o1ef09d7553cet92b43aefbc155";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayForecast);
}

function displayForecast (response){
  let forecastHtml="";


response.data.daily.forEach (function (day, index){
  if(index<5){
  forecastHtml = forecastHtml + `<div class="row">
  <div class="col-2">
   <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum)}º</div>
        </div>
      </div>
      </div>
      </div>`
      ;
          }
}); 

let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}




function formatDate(date){
let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes <10){
    minutes = `0${minutes}`}; 

if (hour<10){ hour=`0${hour}`;
}
let day = currentTime.getDay();


let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let formattedDay = days[day];

return `${formattedDay} ${hour}:${minutes}`;
}

let currentDate = document.querySelector("#current-date");
let currentTime=new Date();
currentDate.innerHTML = formatDate(currentTime);


