//var userData = require('./main.js.js');

//console.log(userData);

var details = document.getElementById("myform");
let register = document.getElementById("regs");

register.addEventListener("click", e => {
  e.preventDefault();
  let data = {
    userDetail: register.value
  };
  console.log(data);
  window.location.href = "html/sign_in.html";
});
