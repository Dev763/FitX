// Toggle to Signup Form
var register = document.querySelector('.register');
var loginCard = document.querySelector('.login-card');

register.addEventListener("click", function (e) {
  e.preventDefault();
  loginCard.style.display = "none";
  document.querySelector('.signup').style.display = "block";
});

// Toggle to Login Form
function signin() {
  loginCard.style.display = "block";
  document.querySelector('.signup').style.display = "none";
}

// Handle Signup
document.querySelector('.reg').addEventListener("click", function (e) {
  e.preventDefault();

  const username = document.querySelector('.Username input').value;
  const email = document.querySelector('.Email input').value;
  const password = document.querySelector('.Password input').value;
  const repassword = document.querySelector('.Repassword input').value;

  if (password !== repassword) {
    alert("Passwords do not match!");
    return;
  }

  if (
    username.trim() === '' ||
    email.trim() === '' ||
    password.trim() === '' ||
    repassword.trim() === '' ||
    !email.includes('@')
  ) {
    alert("Please fill all fields correctly.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.some(user => user.email === email);
  if (exists) {
    alert("Email already registered!");
    return;
  }

  const newUser = {
    username: username,
    email: email,
    password: password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered successfully!");
  signin(); // go back to login
});

// Handle Login
document.querySelector('.button1').addEventListener('click', function (e) {
  e.preventDefault();

  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const found = users.find(user =>
    user.email === loginEmail && user.password === loginPassword
  );

  if (found) {
    alert("Login successful!");
      localStorage.setItem("loggedInUser", JSON.stringify(found)); 
    window.location.href = "Dashboard.html"; // redirect
  } else {
    alert("Invalid email or password!");
  }

});




