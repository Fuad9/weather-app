// const proxy = "https://cors-anywhere.herokuapp.com/";
// const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?q=Dhaka,bd&APPID=c0a13cdeb3f7cac0507317486f399f72`;

//set api
const api = {
    key: "c0a13cdeb3f7cac0507317486f399f72",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

document.querySelector(".btn").addEventListener("click", () => {
    const cityname = document.getElementById("city").value;
    getApiData(cityname);
});

document.getElementById("city").addEventListener("keydown", (event) => {
    const cityname = document.getElementById("city").value;
    if (event.keyCode === 13) {
        getApiData(cityname);
    }
});

//get user data
let getApiData = (city) => {
    fetch(`${api.baseUrl}?q=${city}&appid=${api.key}&units=metric`)
        .then((response) => response.json())
        .then((data) => showData(data));
};

// show city weather
let showData = (weather) => {
    console.log(weather);
    document.getElementById("city-name").innerText =
        weather.name + ", " + weather.sys.country;
    document.getElementById("degree").innerText = weather.main.temp;
    document.getElementById("lead").innerText = weather.weather[0].main;
    document.querySelector(".sunriseTime").textContent = displayTime(
        weather.sys.sunrise
    );
    document.querySelector(".sunsetTime").textContent = displayTime(
        weather.sys.sunset
    );

    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
    document.getElementById("icon-type").setAttribute("src", iconUrl);
};

let displayTime = (sunT) => {
    let date = new Date(sunT * 1000);
    let time = date.toLocaleTimeString();
    return time;
};

setInterval(() => {
    var t = new Date().getTime();
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    var result = hours + ": " + minutes + ": " + seconds;
    document.querySelector(".time2").textContent = result;
}, 1000);