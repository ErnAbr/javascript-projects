const blogsURL = "http://localhost:3000/blogs";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const inputTitle = document.querySelector("#input-title");
const inputPicture = document.querySelector("#input-picture");
const inputText = document.querySelector("#input-text");
const createButton = document.querySelector("#create-button");

const postBlog = async (data) => {
  try {
    const response = await fetch(blogsURL, {
      method: "POST",
      headers: defaultHeaders,

      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert("blog entry has been created");
      window.location.href = "./index.html";
    } else {
      alert("failed to create a blog entry");
    }
  } catch (error) {
    console.error(error);
  }
};

createButton.addEventListener("click", (e) => {
  e.preventDefault();

  const data = {
    title: inputTitle.value,
    content: inputText.value,
    image: inputPicture.value,
  };
  postBlog(data);
});
