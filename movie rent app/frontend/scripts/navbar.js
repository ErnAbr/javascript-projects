const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".ul-nav");
const anchorItem = document.querySelectorAll("li");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll("li").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

const authToken = localStorage.getItem("userId");

if (authToken) {
  const hiddenItems = Array.from(anchorItem).slice(3, 7);
  const newNavList = Array.from(anchorItem).splice(1, 2);

  const logOutBtn = anchorItem[anchorItem.length - 1];
  logOutBtn.setAttribute("id", "log-out");

  hiddenItems.forEach((item) => {
    if (item.hasAttribute("hidden")) {
      item.removeAttribute("hidden");
    }
  });

  newNavList.forEach((item) => {
    if (!item.hasAttribute("hidden")) {
      item.setAttribute("hidden", true);
    }
  });
} else {
  console.log("User is not connected");
}

const logOut = document.querySelector("#log-out");
if (logOut) {
  logOut.addEventListener("click", () => {
    localStorage.clear();
    window.location = "/frontend/index.html";
  });
}
