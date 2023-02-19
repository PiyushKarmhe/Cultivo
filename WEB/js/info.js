var submit = document.querySelector(".submit-btn");
var result = document.querySelector(".result");
var N = document.getElementById("N");
var P = document.getElementById("P");
var K = document.getElementById("K");
var hum = document.getElementById("hum");
var temp = document.getElementById("temp");
var pH = document.getElementById("ph");
var rain = document.getElementById("rain");
var crop = document.getElementById("crop");
const endPoint = "http://localhost:8000/manual.html/bestcrop"
console.log(submit);

var functan = async () => {
    crop = document.getElementById("crop").value;
    fetch(endPoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
            "crop": crop
        }),
    })
        .then(data => data.json())
        .then((log) => {
            console.log(log);
            N.innerHTML = "Nitrogen: " + log["N"];
            P.innerHTML = "Phosphorus: " + log["P"];
            K.innerHTML = "Potassium: " + log["K"];
            temp.innerHTML = "Temperature: " + log["Temperature"];
            hum.innerHTML = "Humidity: " + log["Humidity"];
            pH.innerHTML = "pH: " + log["pH"];
            rain.innerHTML = "Rainfall: " + log["Rainfall"];
        })
        .catch((err) => console.log(err));
};

if (submit) {
    submit.addEventListener("click", functan);
}