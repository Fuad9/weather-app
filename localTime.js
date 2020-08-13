window.addEventListener("load", () => {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?q=Dhaka,bd&APPID=c0a13cdeb3f7cac0507317486f399f72`;

    fetch(api)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const { sunrise, sunset } = data.sys;
            const { temp } = data.main;
            document.querySelector(".sunriseTime").textContent = displayT(sunrise);
            document.querySelector(".sunsetTime").textContent = displayT(sunset);
            document.querySelector(".temp-degree").textContent = temp - 273.15;
        });

    let displayT = (sunT) => {
        let date = new Date(sunT * 1000);
        let time = date.toLocaleTimeString();
        return time;
    };
});

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