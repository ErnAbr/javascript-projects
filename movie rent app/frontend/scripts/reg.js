import { BASE_URL } from "../common/services.js";

const regForm = document.querySelector("#reg-form");
const submitBtn = document.querySelector("#submit-btn");
const cancelBtn = document.querySelector("#cancel-btn");

const registerUser = async (e) => {
  e.preventDefault();

  const passwordInput = document.getElementById("password");
  const repPasswordInput = document.getElementById("repeated-password");

  passwordInput.classList.remove("error");
  repPasswordInput.classList.remove("error");

  const body = {
    firstName: e.target["first-name"].value,
    lastName: e.target["last-name"].value,
    email: e.target["email"].value,
    password: e.target["password"].value,
    repPassword: e.target["repeated-password"].value,
  };

  if (
    body.firstName.trim() === "" ||
    body.lastName.trim() === "" ||
    body.email.trim() === "" ||
    body.password.trim() === "" ||
    body.repPassword.trim() === ""
  ) {
    return alert("Please fill in all fields.");
  } else if (body.password !== body.repPassword) {
    passwordInput.classList.add("error");
    repPasswordInput.classList.add("error");
    alert("Passwords don't match");
  } else {
    //send this to user registration collection
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok) {
        return alert(data.message);
      }
      alert(data.message);
      window.location = "./login.html";
    } catch (error) {
      alert(error);
    }
  }
};

regForm.addEventListener("submit", registerUser);

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location = "../index.html";
});
