window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let localTime = document.querySelector("#time");
  let showPressure = document.querySelector(".pressure");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

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
          locationTimezone.textContent = data.timezone;
          localTime.textContent = displayTimeZone(time);
          showPressure.textContent = (pressure / 101.325).toFixed(2);

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

  // Showing local time
  function displayTimeZone(timestamp) {
    // Multiply by 1000 because JS works in milliseconds instead of the UNIX seconds
    var date = new Date(timestamp * 1000);

    var year = date.getFullYear();
    var month = date.getMonth() + 1; // getMonth() is zero-indexed, so we'll increment to get the correct month number
    var day = date.getDate();
    var t = date.toLocaleTimeString();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return month + "-" + day + "-" + year + " " + t;
  }
});
