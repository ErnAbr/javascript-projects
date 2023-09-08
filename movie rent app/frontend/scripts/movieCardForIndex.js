export const movieCardForIndex = (movie) => {
  const movieDiv = document.createElement("div");
  const movieTitle = document.createElement("h3");
  movieTitle.textContent = `Title: ${movie.title}`;
  const movieCategory = document.createElement("p");
  movieCategory.textContent = `Category: ${movie.category}`;
  const movieRentPrice = document.createElement("p");
  movieRentPrice.textContent = `Rent Price: ${movie.rentPrice}`;
  const movieStatus = document.createElement("p");
  movieStatus.textContent = `Status: ${movie.status}`;
  const rentBtn = document.createElement("button");
  rentBtn.textContent = "Rent";
  rentBtn.setAttribute("disabled", true);
  rentBtn.dataset.movieInfo = JSON.stringify({
    _id: movie.userId,
    title: movie.title,
    category: movie.category,
    rentPrice: movie.rentPrice,
    status: movie.status,
  });

  movieDiv.append(
    movieTitle,
    movieCategory,
    movieRentPrice,
    movieStatus,
    rentBtn
  );

  return movieDiv;
};
