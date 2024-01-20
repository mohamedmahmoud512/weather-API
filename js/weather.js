"use strict"
const search = document.getElementById("search");
const getLocation = document.getElementById("getLocation");
const find = document.getElementById("find");
const text = document.getElementById("condition");
const firstIcon = document.getElementById("firstIcon");
const SecondIcon = document.getElementById("SecondIcon");
const ThirdIcon = document.getElementById("ThirdIcon");
const Location = document.getElementById("Location");
const Temp = document.getElementById("Temp");
const rain = document.getElementById("rain");
const wide = document.getElementById("wide");
const SecondDayTemp = document.getElementById("SecondDayTemp");
const SecondDay = document.getElementById("secondDay");
const ThirdDay = document.getElementById("ThirdDay");
const thirdDayTemp = document.getElementById("thirdDayTemp");
const currentDay = document.getElementById("currentDay");
const currentDate = document.getElementById("currentDate");
const SecondDayCondition = document.getElementById("SecondDayCondition");
const thirdDayCondition = document.getElementById("thirdDayCondition");
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = [" January", " February", " March", " April", " May", " June", " July", " August", " September", " October", " November", " December"];
let country;
function GEtLocation(showPosition) {
    navigator.geolocation.getCurrentPosition(showPosition);
}
GEtLocation(showPosition)
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiUrl = `https://geocode.xyz/${latitude},${longitude}?json=1`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            country = data.country;
            if (country == undefined) {
                location.reload();
            }
            let URL = `https://api.weatherapi.com/v1/forecast.json?key=0b0606b6b57041c4809132857241001&q=${country}&days=3`;
            APIcall(URL);
        })
        .catch(error => {
            console.log("Error:", error);
        });
}
document.addEventListener("keydown", function (e) {
    URL = `https://api.weatherapi.com/v1/forecast.json?key=0b0606b6b57041c4809132857241001&q=${search.value}&days=3`;
    if (e.code == "Enter") {
        if (search.value != "") {
            search.value = "";
            APIcall(URL)
        } else {
            window.alert("please Enter country name ......");
        }
    }
})
find.addEventListener("click", function () {
    URL = `https://api.weatherapi.com/v1/forecast.json?key=0b0606b6b57041c4809132857241001&q=${search.value}&days=3`;
    if (search.value != "") {
        search.value = "";
        APIcall(URL)
    } else {
        window.alert("please Enter country name ......");
    }
})
getLocation.addEventListener("click", function () {
    GEtLocation(showPosition);
    if(country!=undefined){
    window.alert("Your Location is : "+country+" Success Set");
    }
})
function APIcall(URL) {
    let weather = {};
    let HTTP = new XMLHttpRequest();
    HTTP.open("get", URL);
    HTTP.send();
    HTTP.addEventListener("readystatechange", function () {
        if (HTTP.readyState == 4) {
            weather = JSON.parse(HTTP.response);
            getCurrentWeather(weather);
            getSecondDayWeather(weather);
            getThirdDayWeather(weather);
        }
    })
}
let today;
function getCurrentWeather(weather) {
    text.innerText = weather.current.condition.text;
    firstIcon.src = weather.current.condition.icon;
    Location.innerText = weather.location.name;
    let F = Temp.innerText = weather.current.temp_c;
    Temp.innerHTML = F + `<sup>o</sup>c`
    rain.innerText = weather.current.cloud + " %";
    wide.innerText = weather.current.wind_kph + " km/h"
    today = new Date(weather.location.localtime);
    today.toString();
    currentDay.innerText = daysOfWeek[today.getDay()];
    currentDate.innerText = today.getUTCDate() + monthNames[today.getUTCMonth()];
}
function getSecondDayWeather(weather) {
    let secondDay = weather.forecast.forecastday[1];
    today = new Date(secondDay.date);
    today.toString();
    SecondDay.innerText = daysOfWeek[today.getUTCDay()];
    let F = secondDay.day.maxtemp_c;
    SecondDayTemp.innerHTML = F + `<sup>o</sup>c`;
    SecondDayCondition.innerText = secondDay.day.condition.text;
    SecondIcon.src = secondDay.day.condition.icon;
}
function getThirdDayWeather(weather) {
    let thirdDay = weather.forecast.forecastday[2];
    today = new Date(thirdDay.date);
    today.toString();
    ThirdDay.innerText = daysOfWeek[today.getUTCDay()];
    let F = thirdDay.day.maxtemp_c;
    thirdDayTemp.innerHTML = F + `<sup>o</sup>c`;
    thirdDayCondition.innerText = thirdDay.day.condition.text;
    ThirdIcon.src = thirdDay.day.condition.icon;
}
