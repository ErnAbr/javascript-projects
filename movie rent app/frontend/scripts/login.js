import { BASE_URL } from "../common/services.js";

const loginBtn = document.querySelector("#login-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

loginBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    const body = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
    }
    if (data._id) {
      window.localStorage.setItem("userId", data._id);
      alert(`login successful`);
      window.location = "../index.html";
    }
  } catch (error) {
    alert(error);
  }
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location = "../index.html";
});
