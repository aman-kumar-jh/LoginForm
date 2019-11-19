import {data} from "public/js/signIn.js"

//console.log(userData);

var details = document.getElementById("myform");
let register = document.getElementById("regs");

register.addEventListener("click", e => {
  e.preventDefault();
  let Data = {
    userSecurity : data,
    userDetail: details.value
  };
  ajax("http://localhost:3000/addname", "POST", JSON.stringify(data))
  .then(function(result) {
    window.location.href = "html/sign_in.html";
  })
  .catch(function() {
    console.log("failed");
  });
});
