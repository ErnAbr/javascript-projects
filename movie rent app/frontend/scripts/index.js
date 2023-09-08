import { BASE_URL } from "../common/services.js";
import { movieCardForIndex } from "./movieCardForIndex.js";

const authToken = localStorage.getItem("userId");

const movieContainer = document.querySelector("#movies-container");

const rentMovie = async (movieInfo) => {
  const body = {
    userId: authToken,
    movieId: movieInfo._id,
    title: movieInfo.title,
    category: movieInfo.category,
    rentPrice: movieInfo.rentPrice,
    status: "Rented",
  };
  try {
    const response = await fetch(`${BASE_URL}/index/rent`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
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

const displayAllMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/index/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const movies = await response.json();

    movies.forEach((movie) => {
      if (movie.userId !== authToken) {
        const card = movieCardForIndex(movie);
        movieContainer.appendChild(card);
      }
    });

    if (authToken) {
      const rentButtons = movieContainer.querySelectorAll("button");
      rentButtons.forEach((button) => {
        const movieInfo = JSON.parse(button.dataset.movieInfo);

        if (movieInfo.status === "Available") {
          button.removeAttribute("disabled");
        }

        button.addEventListener("click", () => {
          rentMovie(movieInfo);
        });
      });
    }
  } catch (error) {
    alert(error);
  }
};

displayAllMovies();
