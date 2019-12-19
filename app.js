const currentDayElement = document.querySelector(".page-title-div p");
const weatherIconElement = document.querySelector(".weather-icon-div img");
const weatherTextElement = document.querySelector(".weather-text-div p");
const weatherTemperatureElement = document.querySelector(".weather-text-div span");
const sunriseElement = document.querySelector(".sunrise-div p");
const sunsetElement = document.querySelector(".sunset-div p");
const feelsLikeElement = document.querySelector(".feels-like-div p");
const windElement = document.querySelector(".wind-p");
const pressureElement = document.querySelector(".pressure-p");
const forecastDayElement = document.querySelector(".forecast-day-div p");
const forecastDay2Element = document.querySelector(".forecast-day2-div p");
const forecastDay3Element = document.querySelector(".forecast-day3-div p");
const forecastDay4Element = document.querySelector(".forecast-day4-div p");
const forecastDay5Element = document.querySelector(".forecast-day5-div p");
const forecastImgElement = document.querySelector(".forecast-icon-div img");
const forecastImg2Element = document.querySelector(".forecast-icon2-div img");
const forecastImg3Element = document.querySelector(".forecast-icon3-div img");
const forecastImg4Element = document.querySelector(".forecast-icon4-div img");
const forecastImg5Element = document.querySelector(".forecast-icon5-div img");
const forecastMinTempElement = document.querySelector(".forecast-min-temperature-div p");
const forecastMaxTempElement = document.querySelector(".forecast-max-temperature-div p");
const forecastMinTemp2Element = document.querySelector(".forecast-min-temperature2-div p");
const forecastMaxTemp2Element = document.querySelector(".forecast-max-temperature2-div p");
const forecastMinTemp3Element = document.querySelector(".forecast-min-temperature3-div p");
const forecastMaxTemp3Element = document.querySelector(".forecast-max-temperature3-div p");
const forecastMinTemp4Element = document.querySelector(".forecast-min-temperature4-div p");
const forecastMaxTemp4Element = document.querySelector(".forecast-max-temperature4-div p");
const forecastMinTemp5Element = document.querySelector(".forecast-min-temperature5-div p");
const forecastMaxTemp5Element = document.querySelector(".forecast-max-temperature5-div p");

function loadDoc(url, mainFunction) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        mainFunction(JSON.parse(xhttp.response));
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
function loadForecast(url, forecastFunction) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        forecastFunction(JSON.parse(xhttp.response));
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function mainFunction(data){
    const currentDay = data.dt;
    const temperatureData = data.main;
    const currentWeather = data.weather[0];
    const city = data.name;
    const sunriseTime = data.sys.sunrise;
    const sunsetTime = data.sys.sunset;
    const feelsLike = data.main.feels_like;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;
    setWeather(currentWeather);
    setTemperature(temperatureData);
    setDayAndCity(currentDay,city);
    setSunriseTime(sunriseTime);
    setSunsetTime(sunsetTime);
    setFeelsLike(feelsLike);
    setWindSpeed(windSpeed);
    setPressure(pressure);
}
function forecastFunction(data){
    console.log(data);
    var daysForForecast = [];
    for(i=0;i<data.list.length;i++){
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date(data.list[i].dt * 1000);
        var dayName = days[d.getDay()];
        if(!daysForForecast.includes(dayName)){
            daysForForecast.push(dayName);
        }
    }
    setForecastDay(daysForForecast[1]);
    setForecastDay2(daysForForecast[2]);
    setForecastDay3(daysForForecast[3]);
    setForecastDay4(daysForForecast[4]);
    setForecastDay5(daysForForecast[5]);

    var iconsForForecast = [];
    for(i=7;i<data.list.length;i=i+8){
        iconsForForecast.push(data.list[i].weather[0].icon);
    }
    setForecastIcon(iconsForForecast[0]);
    setForecastIcon2(iconsForForecast[1]);
    setForecastIcon3(iconsForForecast[2]);
    setForecastIcon4(iconsForForecast[3]);
    setForecastIcon5(iconsForForecast[4]);

    var temp = "00";
    var finalTempArray =[];
    var a=0;
    for(i=0;i<data.list.length;i++){
        var x = data.list[i].dt_txt.slice(11,13);
        var tempArray = [];
        
        if(x===temp){
            
            for(j=i;j<j+8;j++){
                if(j===40) break;
                if(j===(data.list.length-1)){
                    x = data.list[j].dt_txt.slice(11,13);
                }
                else{
                    x = data.list[j+1].dt_txt.slice(11,13);
                }
                if(x===temp) break;
                tempArray.push(data.list[j].main.temp);
            }
            
            finalTempArray[a]=tempArray;
            a++;
            
        }
    }
    console.log(finalTempArray[0]);
    setMinMaxTemperatureDay1(finalTempArray[0]);
    setMinMaxTemperatureDay2(finalTempArray[1]);
    setMinMaxTemperatureDay3(finalTempArray[2]);
    setMinMaxTemperatureDay4(finalTempArray[3]);
    setMinMaxTemperatureDay5(finalTempArray[4]);
}
function setMinMaxTemperatureDay1(temp){
    var min=temp[0],
        max=temp[0];
    console.log(temp);
    for(i=1;i<temp.length;i++){
        for(j=0;j<=i;j++){
            if(temp[j]<min){
                min=temp[j];
            }
            if(temp[j]>max){
                max=temp[j];
            }
        }
    }
    forecastMinTempElement.innerHTML = convertToCelzius(min) + "°C<sub>(min)</sub>";
    forecastMaxTempElement.innerHTML = convertToCelzius(max) +"°C<sub>(max)</sub>";
}
function setMinMaxTemperatureDay2(temp){
    var min=temp[0],
        max=temp[0];
    console.log(temp);
    for(i=1;i<temp.length;i++){
        for(j=0;j<=i;j++){
            if(temp[j]<min){
                min=temp[j];
            }
            if(temp[j]>max){
                max=temp[j];
            }
        }
    }
    forecastMinTemp2Element.innerHTML = convertToCelzius(min) + "°C<sub>(min)</sub>";
    forecastMaxTemp2Element.innerHTML = convertToCelzius(max) +"°C<sub>(max)</sub>";
}
function setMinMaxTemperatureDay3(temp){
    var min=temp[0],
        max=temp[0];
    console.log(temp);
    for(i=1;i<temp.length;i++){
        for(j=0;j<=i;j++){
            if(temp[j]<min){
                min=temp[j];
            }
            if(temp[j]>max){
                max=temp[j];
            }
        }
    }
    forecastMinTemp3Element.innerHTML = convertToCelzius(min) + "°C<sub>(min)</sub>";
    forecastMaxTemp3Element.innerHTML = convertToCelzius(max) +"°C<sub>(max)</sub>";
}
function setMinMaxTemperatureDay4(temp){
    var min=temp[0],
        max=temp[0];
    console.log(temp);
    for(i=1;i<temp.length;i++){
        for(j=0;j<=i;j++){
            if(temp[j]<min){
                min=temp[j];
            }
            if(temp[j]>max){
                max=temp[j];
            }
        }
    }
    forecastMinTemp4Element.innerHTML = convertToCelzius(min) + "°C<sub>(min)</sub>";
    forecastMaxTemp4Element.innerHTML = convertToCelzius(max) +"°C<sub>(max)</sub>";
}
function setMinMaxTemperatureDay5(temp){
    var min=temp[0],
        max=temp[0];
    console.log(temp);
    for(i=1;i<temp.length;i++){
        for(j=0;j<=i;j++){
            if(temp[j]<min){
                min=temp[j];
            }
            if(temp[j]>max){
                max=temp[j];
            }
        }
    }
    forecastMinTemp5Element.innerHTML = convertToCelzius(min) + "°C<sub>(min)</sub>";
    forecastMaxTemp5Element.innerHTML = convertToCelzius(max) +"°C<sub>(max)</sub>";
}
function setForecastIcon(icon){
    forecastImgElement.setAttribute("src","img/icon/" + icon + ".png")
}
function setForecastIcon2(icon){
    forecastImg2Element.setAttribute("src","img/icon/" + icon + ".png")
}
function setForecastIcon3(icon){
    forecastImg3Element.setAttribute("src","img/icon/" + icon + ".png")
}
function setForecastIcon4(icon){
    forecastImg4Element.setAttribute("src","img/icon/" + icon + ".png")
}
function setForecastIcon5(icon){
    forecastImg5Element.setAttribute("src","img/icon/" + icon + ".png")
}
function setForecastDay(day){
    forecastDayElement.innerHTML = day;
}
function setForecastDay2(day){
    forecastDay2Element.innerHTML = day;
}
function setForecastDay3(day){
    forecastDay3Element.innerHTML = day;
}
function setForecastDay4(day){
    forecastDay4Element.innerHTML = day;
}
function setForecastDay5(day){
    forecastDay5Element.innerHTML = day;
}
function setWeather(currentWeather){
    const description = currentWeather.description;
    const icon = currentWeather.icon;
    weatherTextElement.innerHTML = description;
    weatherIconElement.setAttribute("src","img/icon/" + icon + ".png");
}
function setTemperature(temperatureData){
    let currentTemperature = temperatureData.temp;
    weatherTemperatureElement.innerHTML = convertToCelzius(currentTemperature) + "°C";
}
function setDayAndCity(currentDay,city){
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var d = new Date(currentDay * 1000);
    var dayName = days[d.getDay()];
    var date = d.getDate();
    var month = d.getMonth()+1;
    var year = d.getFullYear();
    currentDayElement.innerHTML = city + ", " + dayName +" "+ date + "." + month + "."+ year;
}
function setSunriseTime(sunriseTime){
    sunriseElement.innerHTML = convertTime(sunriseTime);
}
function setSunsetTime(sunsetTime){
    sunsetElement.innerHTML = convertTime(sunsetTime);
}
function convertTime(time){
    let dt = new Date(time * 1000)
    let h = dt.getHours()
    let m = "0" + dt.getMinutes()
    let t = h + ":" + m.substr(-2)
    return t
}
function setFeelsLike(feelsLike){
    feelsLikeElement.innerHTML ="Feels like: " +convertToCelzius(feelsLike)+ "°C";
}
function setWindSpeed(windSpeed){
    windElement.innerHTML = "<i>Wind speed:</i> " + windSpeed + "m/s";
}
function setPressure(pressure){
    pressureElement.innerHTML = "<i>Pressure: </i>" + pressure + "bar"
}

function convertToDay(day){
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var d = new Date(day * 1000);
    var dayName = days[d.getDay()];
    return dayName;
}
function convertToCelzius(t){
    return Math.round((t-273.15) * 100) / 100;
}


loadDoc('http://api.openweathermap.org/data/2.5/weather?q=Zenica&APPID=e1603fb9a5d002bd29341af23c0e120f',mainFunction);
loadForecast('http://api.openweathermap.org/data/2.5/forecast?q=Zenica,ba&APPID=e1603fb9a5d002bd29341af23c0e120f',forecastFunction);