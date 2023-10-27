import "./styles/base.scss";
import { createTable } from "./utils/table";
import { deleteSkill } from "./services/delete";

const base_url = "https://melon-potent-period.glitch.me/skills";
const output = document.querySelector("#output");

const asignDeleteEvent = () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const rowId = button.closest("tr").getAttribute("id");
      deleteSkill(rowId);
    });
  });
};

const logSkills = async () => {
  const response = await fetch(base_url);
  const skills = await response.json();

  skills.forEach((skill) => {
    const tableRow = createTable(skill);
    output.append(tableRow);
  });

  asignDeleteEvent();
};

logSkills();
