window.addEventListener("load", () => {
    function displayTime() {
        var d = new Date();
        var n = d.toLocaleTimeString();
        document.getElementById("time").textContent = n;
    }
    displayTime();
});