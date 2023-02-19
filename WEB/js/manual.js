var submit = document.querySelector(".submit-btn");
var result = document.querySelector(".result");
var res1 = document.getElementById("res1")
var res2 = document.getElementById("res2")
var res3 = document.getElementById("res3")
var Nitrogen = parseFloat(document.getElementById("Nitrogen").value);
var Potassium = parseFloat(document.getElementById("Potassium").value);
var Phosphorus = parseFloat(document.getElementById("Phosphorus").value);
var Humidity = parseFloat(document.getElementById("Humidity").value);
var Temperature = parseFloat(document.getElementById("Temperature").value);
var pH = parseFloat(document.getElementById("pH").value);
var Rainfall = parseFloat(document.getElementById("Rainfall").value);
const endPoint = "http://localhost:8000/manual.html/test";
console.log(result);

var functan = async () => {
  // mango = [30,28,30,32,52,5,98]
  // coffee = [104, 18, 30, 24, 60, 7, 141]
  Nitrogen = parseFloat(document.getElementById("Nitrogen").value);
  Potassium = parseFloat(document.getElementById("Potassium").value);
  Phosphorus = parseFloat(document.getElementById("Phosphorus").value);
  Humidity = parseFloat(document.getElementById("Humidity").value);
  Temperature = parseFloat(document.getElementById("Temperature").value);
  pH = parseFloat(document.getElementById("pH").value);
  Rainfall = parseFloat(document.getElementById("Rainfall").value);
  fetch(endPoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      "params": [Nitrogen, Phosphorus, Potassium, Temperature, Humidity, pH, Rainfall]
    }),
  })
    .then(data => data.json())
    .then((log) => {
      console.log(log);
      res1.innerHTML = log['result'][0];
      res2.innerHTML = log['result'][1];
      res3.innerHTML = log['result'][2];
      console.log([Nitrogen, Phosphorus, Potassium, Temperature, Humidity, pH, Rainfall]);
    })
    .catch((err) => console.log(err));
};

submit.addEventListener("click", functan);