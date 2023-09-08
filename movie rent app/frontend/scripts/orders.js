import { BASE_URL } from "../common/services.js";
import { orderMovieCard } from "./orderMovieCard.js";

const movieContainer = document.querySelector("#movies-container");
const authToken = localStorage.getItem("userId");

const returnMovie = async (movieInfo) => {
  const body = {
    movieLessorId: movieInfo._id,
    movieTenantId: authToken,
    title: movieInfo.title,
    category: movieInfo.category,
    rentPrice: movieInfo.rentPrice,
    status: "Available",
  };
  try {
    const response = await fetch(
      `${BASE_URL}/orders/delete/${body.movieLessorId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    alert(data.message);
    location.reload();
  } catch (error) {
    alert(error);
  }
};

const displayRentedMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/orders/${authToken}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await response.json();

    user.orders.forEach((order) => {
      const card = orderMovieCard(order);
      movieContainer.appendChild(card);
    });

    const returnBtn = movieContainer.querySelectorAll("button");
    returnBtn.forEach((button) => {
      const movieInfo = JSON.parse(button.dataset.movieInfo);
      button.addEventListener("click", () => {
        returnMovie(movieInfo);
      });
    });
  } catch (error) {
    alert(error);
  }
};

displayRentedMovies();
