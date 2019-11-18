//var userData = require('./main.js.js');

console.log(userData);

var details = document.getElementById("myform");
let register = document.getElementById("regs");

register.addEventListener("click", registerUser);

var registerUser = function() {
  e.preventDefault();
  let data = {
    "first name": firstName.value,
    "last name": lastName.value,
    college: collegeName.value,
    address: address1.value + address2.value,
    zip: zipCode.value,
    state: state.value,
    country: countryCode.value,
    "country code": countryCode.value,
    "phone number": phoneNumber.value
  };
  console.log(data);
};
