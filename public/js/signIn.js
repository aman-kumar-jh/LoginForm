var register = document.getElementById("signin");
var username = document.getElementById("your_id");
var password = document.getElementById("your_pass");
var alertSucess = document.getElementById("alert-success");
var alertFault = document.getElementById("alert-fault");

alertSucess.style.display = "none";
alertFault.style.display = "none";

function ajax(url, method, data) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.responseType = "text";
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject(Error(request.statusText));
        }
      }
    };
    request.onerror = function() {
      reject(Error("Network Error"));
    };
    request.send(data);
  });
}


var correct = false;


var check = register.addEventListener("click", e => {
  e.preventDefault();
  var data = {
    username: username.value,
    password: password.value
  };
    ajax("http://localhost:3000/finduser", "POST", JSON.stringify(data))
      .then(function(result) {
        var res = JSON.parse(result);
        if (res.status) {
          alertSucess.style.display = "none";
          alertSucess.style.display = "block";
          correct = true;
        } else {
          alertFault.style.display = "block";
        }
        console.log(result);
      })
      .catch(function() {
        alertFault.style.display = "block";
        console.log("failed");
      });
});
