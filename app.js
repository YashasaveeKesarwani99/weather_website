 //select elements
const iconElement= document.querySelector(".weather-icon");
const tempElement= document.querySelector(".temperaure-value p");
const descElement= document.querySelector(".temperature-description p");
const notificationElement= document.querySelector(".notification");

//app data;
const weather={};

weather.temperature={
    unit:"celcius"
}

//app consts and vars
const KELVIN=273;
//api key
const key="b27a438ffa508b7aa4ccce6aa5153636";

//check if browser supports geollocation
if('geolocation' in navigator)
{
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}
else{
    notificationElement.getElementsByClassName.display="block";
    notificationElement.innerHTML="<p>Browser doesnt support Geolocation</p>";

}
//set user's postion
function setPosition(position)
{
    let latitude= position.coords.latitude;
    let longitude= position.coords.longitude;
    
    getWeather(latitude,longitude);
}

//show error when there is an issue with geolocation service
function showError(error)
{
    notificationElement.getElementsByClassName.display="block";
    notificationElement.innerHTML= `<p>${error.message}</p>`;
}

//get weather from api
function getWeather(latitude,longitude)
{
    let api=`http://api.openweather.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

        fetch(api)
        .then(function(response){
            let data= response.json();
            return data;
        })
        .then(function(response){
            weather.temperature.value= Math.floor(data.main.temp-KELVIN);
        });

}
// display weather to ui
function displayWeather()
{
    iconElement.innerHTML=`<img src="icons/${weather.iconld}.png"/>`;
    tempElement.innerHTML=`${weather.temperature.value}~<span>C</span>`;
    descElement.innerHTML=weather.description;
    locationElement.innerHTML=`${weather.city},${weather.country}`;

}
//c to f conversion
function celciusToFarenheit(temperature){
    return (temperature*9/5)+32;
}

//wwhen the user clicks on the temperature element
tempElement.addEventListener("click",function(){
    if(weather.temperature.value===undefined)
        return ;
    if(weather.temperature.unit=="celcius")
    {
        let farenheit=celciusToFarenheit(weather.temperature.value);
        farenheit=Math.floor(farenheit);
        
        tempElement.innerHTML=`${farenheit}~<span>F</span>`;
        weather.temperature.unit="celcius";
    }
    else
    {
        tempElement.innerHTML=`${weather.temperature.value}~<span>C</span>`;
    }

});