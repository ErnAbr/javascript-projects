export const orderMovieCard = (movie) => {
  const movieDiv = document.createElement("div");
  const movieTitle = document.createElement("h3");
  movieTitle.textContent = `Title: ${movie.title}`;
  const movieCategory = document.createElement("p");
  movieCategory.textContent = `Category: ${movie.category}`;
  const movieRentPrice = document.createElement("p");
  movieRentPrice.textContent = `Rent Price: ${movie.rentPrice}`;
  const returnBtn = document.createElement("button");
  returnBtn.textContent = "Return";
  console.log(movie);
  returnBtn.dataset.movieInfo = JSON.stringify({
    _id: movie._id,
    title: movie.title,
    category: movie.category,
    rentPrice: movie.rentPrice,
    status: movie.status,
  });

  movieDiv.append(movieTitle, movieCategory, movieRentPrice, returnBtn);

  return movieDiv;
};
