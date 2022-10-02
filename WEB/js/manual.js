var submit = document.querySelector(".submit-btn");
const endPoint = "http://localhost:8000/manual.html/pred";
console.log(submit);

var functan = async () => {
    fetch(endPoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8'},
  body: JSON.stringify({
    "params" : [30,28,30,32,52,5,98]
  }),
})
  .then(data => data.json())
  .then((log) => {
    console.log(log);
    })
  .catch((err) => console.log(err));
};

submit.addEventListener("click",functan);