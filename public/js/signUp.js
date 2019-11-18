var submit = document.getElementById("signup");
var password = document.getElementById("pass");
var repPassword = document.getElementById("re_pass");
var email = document.getElementById("email");
var name = document.getElementById("name");
var message = document.getElementById("mess");

var alertWarning = document.getElementById("alert-warning");
var alertFault = document.getElementById("alert-fault");

alertWarning.style.display = "none";
alertFault.style.display = "none";

var validators = {
  lowerCaseLetters: /[a-z]/g,
  upperCaseLetters: /[A-Z]/g,
  numbers: /[0-9]/g,
  specialChar: /[!@#$%^&*(),.?":{}|<>]/g,
  length: 8
};

function ajax(url, method, data) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.responseType = 'text';
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

class Generic {
  addClass(el, className) {
    el.classList.add(className);
  }
  removeClass(el, className) {
    el.classList.remove(className);
  }
  addEvent(el, event, callback) {
    el.addEventListener(event, callback);
  }
}

function eventListeners() {
  generic.addEvent(password, "keyup", keyupC);
  generic.addEvent(password, "focus", focusC);
  generic.addEvent(password, "blur", blurC);
  generic.addEvent(submit, "click", submitC);
}

var focusC = function() {
  message.style.display = "block";
};

// When the user clicks outside of the password field, hide the message box
var blurC = function() {
  message.style.display = "none";
};

// When the user starts to type something inside the password field
var keyupC = function() {
  var validate = new Validate();
  validate.check();
};

function checkPassword(password, repPassword) {
  if (password.value === repPassword.value) return true;
  return false;
}

var submitC = function(e) {
  e.preventDefault();
 
  var data = {
  name: name.value,
  username: email.value,
  password: password.value
  };
  var validate = new Validate();
  if (validate.check()) {
    if (checkPassword(password, repPassword)) {
      ajax("http://localhost:3000/addname", "POST", JSON.stringify(data))
        .then(function(result) {
          window.location.href = "html/form.html";
        })
        .catch(function() {
          console.log("failed");
        });
      //window.location.href = "html/form.html";
    } else {
      alertFault.style.display = "none";
      alertWarning.style.display = "block";
    }
  } else {
    alertWarning.style.display = "none";
    alertFault.style.display = "block";
  }
};

class Validate {
  valid;
  check() {
    this.valid = true;
    if (password.value.match(validators.lowerCaseLetters)) {
      generic.removeClass(letter, "invalid");
      generic.addClass(letter, "valid");
    } else {
      generic.removeClass(letter, "valid");
      generic.addClass(letter, "invalid");
      this.valid = false;
    }

    // Validate capital letters
    if (password.value.match(validators.upperCaseLetters)) {
      generic.removeClass(capital, "invalid");
      generic.addClass(capital, "valid");
    } else {
      generic.removeClass(capital, "valid");
      generic.addClass(capital, "invalid");
      this.valid = false;
    }

    // Validate numbers
    if (password.value.match(validators.numbers)) {
      generic.removeClass(number, "invalid");
      generic.addClass(number, "valid");
    } else {
      generic.removeClass(number, "valid");
      generic.addClass(number, "invalid");
      this.valid = false;
    }

    // Special Char
    if (password.value.match(validators.specialChar)) {
      generic.removeClass(special, "invalid");
      generic.addClass(special, "valid");
    } else {
      generic.removeClass(special, "valid");
      generic.addClass(special, "invalid");
      this.valid = false;
    }

    // Validate length
    if (password.value.length >= validators.length) {
      generic.removeClass(len, "invalid");
      generic.addClass(len, "valid");
    } else {
      generic.removeClass(len, "valid");
      generic.addClass(len, "invalid");
      this.valid = false;
    }
    console.log(this.valid);
    if (this.valid) return true;
    else return false;
  }
}

function init() {
  generic = new Generic();
  eventListeners();
}

init();
