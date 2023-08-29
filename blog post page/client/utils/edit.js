const blogsURL = "http://localhost:3000/blogs";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const inputTitle = document.querySelector("#input-title-update");
const inputPicture = document.querySelector("#input-picture-update");
const inputText = document.querySelector("#input-text-update");
const updateButton = document.querySelector("#update-button");

const { searchParams } = new URL(window.location);
const id = searchParams.get("id");

const updateBlog = async (data) => {
  try {
    const response = await fetch(`${blogsURL}/${id}`, {
      method: "PUT",
      headers: defaultHeaders,

      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert("blog entry has been updated");
      window.location.href = "./index.html";
    } else {
      alert("failed to update a blog entry");
    }
  } catch (error) {
    console.error(error);
  }
};

updateButton.addEventListener("click", (e) => {
  e.preventDefault();

  const data = {
    title: inputTitle.value,
    content: inputText.value,
    image: inputPicture.value,
  };
  updateBlog(data);
});
