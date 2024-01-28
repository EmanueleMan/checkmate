const password = document.getElementById("passwordBox");
const hint = document.getElementById("hint");
const passwordLabel = document.getElementById("passwordLabel");
const repeatLabel = document.getElementById("repeatLabel");
const confirm = document.getElementById("confirmPasswordBox");
const termCheckbox = document.getElementById("termsCheckbox");
const tosElement = document.getElementById("tos-label");
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (event) => validateForm(event));

function validatePassword() {
  var valid = true;

  // Validate password
  var passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
    password.value
  );
  if (!passwordValid) {
    passwordLabel.innerText = "Password doesn't meet the requirements!";
    passwordLabel.style.color = "red";
    valid = false;
  } else {
    passwordLabel.innerText = "Password";
    passwordLabel.style.color = "black";
  }

  //   // Confirm password
  //   if (password.value !== confirm.value) {
  //     confirm.classList.add("error");
  //     confirm.setAttribute("title", "Passwords do not match.");
  //     valid = false;
  //   } else {
  //     confirm.classList.remove("error");
  //     confirm.removeAttribute("title");
  //   }

  return valid;
}

function validateRepeat() {
  let valid = true;
  if (password.value !== confirm.value || !confirm.value) {
    repeatLabel.innerText = "Passwords don't match";
    repeatLabel.style.color = "red";
    valid = false;
  } else {
    repeatLabel.innerText = "Password match!";
    repeatLabel.style.color = "green";
  }

  return valid;
}

function showHint() {
  hint.classList.remove("hidden");
}

function hideHint() {
  hint.classList.add("hidden");
  validatePassword();
  if (password.value === "") {
    passwordLabel.innerText = "Password";
    passwordLabel.style.color = "black";
  }
}

function validateForm(event) {
  event.preventDefault();
  console.log(termCheckbox.checked);
  if (!termCheckbox.checked) {
    tosElement.classList.remove("hidden");
    return false;
  }

  if (termCheckbox.checked && validatePassword() && validateRepeat()) {
    loginForm.submit();
  }
}
