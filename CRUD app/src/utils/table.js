export const createTable = (skill) => {
  const tableRow = document.createElement("tr");
  tableRow.id = skill.id;
  const tableDataId = document.createElement("td");
  const tableDataSkill = document.createElement("td");
  const tableDataDelete = document.createElement("td");

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "delete";

  tableDataId.textContent = skill.id;
  tableDataSkill.textContent = skill.skill;

  tableDataDelete.appendChild(deleteBtn);

  tableRow.append(tableDataId, tableDataSkill, tableDataDelete);
  return tableRow;
};
