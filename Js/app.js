var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

var baseURL = location.pathname.substring(
  0,
  location.pathname.lastIndexOf("/")
);

var username = localStorage.getItem("sessionUsername");
if (username) {
  document.getElementById("username").innerHTML = "Welcome " + username;
}

var signUpArray = JSON.parse(localStorage.getItem("users")) || [];

function isEmpty() {
  return (
    signupName.value !== "" &&
    signupEmail.value !== "" &&
    signupPassword.value !== ""
  );
}

function isEmailExist() {
  return signUpArray.some(
    (user) => user.email.toLowerCase() === signupEmail.value.toLowerCase()
  );
}

function signUp() {
  if (!isEmpty()) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return false;
  }

  if (isEmailExist()) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">Email already exists</span>';
  } else {
    var signUp = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };
    signUpArray.push(signUp);
    localStorage.setItem("users", JSON.stringify(signUpArray));
    document.getElementById("exist").innerHTML =
      '<span class="text-success m-3">Success</span>';
    setTimeout(() => location.replace(baseURL + "/login.html"), 1500);
  }
}

function isLoginEmpty() {
  return signinPassword.value !== "" && signinEmail.value !== "";
}

function login() {
  if (!isLoginEmpty()) {
    document.getElementById("incorrect").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return false;
  }

  var password = signinPassword.value;
  var email = signinEmail.value;
  var user = signUpArray.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (user) {
    localStorage.setItem("sessionUsername", user.name);
    location.replace(baseURL + "/home.html");
  } else {
    document.getElementById("incorrect").innerHTML =
      '<span class="p-2 text-danger">Incorrect email or password</span>';
  }
}

function logout() {
  localStorage.removeItem("sessionUsername");
  location.replace(baseURL + "/index.html");
}
