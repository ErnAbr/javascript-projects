export const deleteSkill = async (rowId) => {
  try {
    const response = await fetch(
      `https://melon-potent-period.glitch.me/skill/${rowId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
