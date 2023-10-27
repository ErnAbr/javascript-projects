import "../styles/base.scss";

const addSkillBtn = document.querySelector("#add-skill-btn");
const inputValue = document.querySelector("#skill-input");
const base_url = "https://melon-potent-period.glitch.me/skills";

const postJSON = async (data) => {
  try {
    const response = await fetch(base_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error);
    } else {
      alert(result.msg);
      location.href = "index.html";
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

addSkillBtn.addEventListener("click", () => {
  const data = { skill: inputValue.value };
  postJSON(data);
});
