window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezon");
    let showPressure = document.querySelector(".pressure");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            // const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?id=524901&appid=d638e17301e29457cec0c56e35e15dce`;

            fetch(api)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    const { time, temperature, summary, pressure, icon } = data.currently;
                    // Set DOM elements from the API
                    temperatureDegree.textContent = (
                        (temperature - 32) *
                        (5 / 9)
                    ).toFixed(2);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = time;
                    showPressure.textContent = pressure;
                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});