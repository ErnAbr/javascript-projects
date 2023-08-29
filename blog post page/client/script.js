import { cards } from "./utils/cards.js";

const blogsURL = "http://localhost:3000/blogs";
const defaultHeaders = {
  "Content-Type": "application/json",
};
const output = document.querySelector("#output");

const getUsers = async () => {
  try {
    const response = await fetch(blogsURL);
    const blogs = await response.json();
    if (blogs.length === 0) {
      const emptyBlogHeader = document.createElement("h2");
      emptyBlogHeader.className = "header-style";
      emptyBlogHeader.textContent = "No blogs have been written yet";
      output.append(emptyBlogHeader);
    } else {
      console.log("Fetched blogs:", blogs);
      blogs.forEach((blog) => {
        const cardDiv = cards(blog);
        output.append(cardDiv);
      });
      deleteBlogPosts();
      updateBlogPost();
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteBlog = async (id) => {
  try {
    const response = await fetch(`${blogsURL}/${id}`, {
      method: "DELETE",
      headers: {
        defaultHeaders,
      },
    });
    if (response.ok) {
      alert("blog entry has been deleted");
      location.reload();
    } else {
      alert(`Failed to delete and entry with an ID: ${id}`);
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteBlogPosts = () => {
  const deleteBlogButton = document.querySelectorAll(".delete-button");
  deleteBlogButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      deleteBlog(event.target.id);
    });
  });
};

const updateBlogPost = () => {
  const updateBlogButton = document.querySelectorAll(".edit-button");
  updateBlogButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      window.location.href = `./edit.html?id=${event.target.id}`;
    });
  });
};

getUsers();
