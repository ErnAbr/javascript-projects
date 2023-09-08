import { BASE_URL } from "../common/services.js";
import { movieCard } from "./movieCard.js";

const authToken = localStorage.getItem("userId");
const movieForm = document.querySelector("#addMovie-form");
const movieContainer = document.querySelector(".my-movies-container");

if (authToken) {
  const addMovie = async (e) => {
    e.preventDefault();
    const body = {
      id: authToken,
      title: e.target["movieTitle"].value,
      category: e.target["movieCategory"].value,
      rentPrice: e.target["movieRentPrice"].value,
    };

    if (
      body.title.trim() === "" ||
      body.category.trim() === "" ||
      body.rentPrice.trim() === ""
    ) {
      movieForm.classList.add("error");
      const inputElements = movieForm.querySelectorAll("input");
      inputElements.forEach((input) => {
        input.classList.add("error");
      });
      return alert("Please fill in all fields.");
    } else {
      try {
        const response = await fetch(`${BASE_URL}/movies/addMovie`, {
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

        window.location = "/frontend/pages/addMovie.html";
      } catch (error) {
        alert(error);
      }
    }
  };

  movieForm.addEventListener("submit", addMovie);
} else {
  alert(`user is not connected`);
  window.location = "/frontend/pages/reg.html";
}

const updateMovie = async (e) => {
  e.preventDefault();
  const editBtn = e.target.closest(".movie-edit-btn");
  const id = editBtn.dataset.id;
  const newTitle = document.querySelector("#movieTitle");
  const newCategory = document.querySelector("#movieCategory");
  const newPrice = document.querySelector("#movieRentPrice");

  if (
    newTitle.value.trim() === "" ||
    newCategory.value.trim() === "" ||
    newPrice.value.trim() === ""
  ) {
    const inputElements = movieForm.querySelectorAll("input");
    inputElements.forEach((input) => {
      input.classList.add("error");
    });
    return alert("Please fill the fields");
  }

  const movieInfo = JSON.parse(editBtn.dataset.movieInfo);
  try {
    const body = {
      id: id,
      title: newTitle.value,
      category: newCategory.value,
      rentPrice: newPrice.value,
      movieInfo: movieInfo,
    };

    const response = await fetch(`${BASE_URL}/movies/movieUpdate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    alert(data.message);
    location.reload();
  } catch (error) {
    alert(error);
  }
};

const deleteMovie = async (e) => {
  const deleteBtn = e.target.closest(".movie-delete-btn");

  const id = deleteBtn.dataset.id;
  const movieInfo = JSON.parse(deleteBtn.dataset.movieInfo);
  try {
    const body = {
      id: id,
      movieInfo: movieInfo, // Include both id and movieInfo in the body
    };
    const response = await fetch(`${BASE_URL}/movies/movieDelete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    alert(data.message);
    location.reload();
  } catch (error) {
    alert(error);
  }
};

const showUserMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movies/userMovies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await response.json();

    users.forEach((user) => {
      if (user._id == authToken) {
        const movieCards = user.movies.map((movie) => {
          return movieCard(movie, authToken);
        });

        movieCards.forEach((card) => {
          movieContainer.appendChild(card);
        });
      }
    });

    movieContainer.addEventListener("click", (event) => {
      const deleteBtn = event.target.closest(".movie-delete-btn");
      const editBtn = event.target.closest(".movie-edit-btn");
      if (deleteBtn) {
        deleteMovie(event);
      }
      if (editBtn) {
        updateMovie(event);
      }
    });
  } catch (error) {
    alert(error);
  }
};

showUserMovies();
