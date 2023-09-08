export const movieCard = (user, authToken) => {
  const card = document.createElement("div");
  card.className = "card";
  const movieTitle = document.createElement("h5");
  movieTitle.textContent = `Title: ${user.title}`;
  const movieCategory = document.createElement("p");
  movieCategory.textContent = `Category: ${user.category}`;
  const movieRentPrice = document.createElement("p");
  movieRentPrice.textContent = `Rent Price: ${user.rentPrice}`;
  const movieBtnContainer = document.createElement("div");
  movieBtnContainer.className = "addMovieBtn";
  const editBtn = document.createElement("button");
  editBtn.className = "movie-edit-btn";
  editBtn.textContent = "Edit";
  editBtn.dataset.id = authToken;
  editBtn.dataset.movieInfo = JSON.stringify({
    title: user.title,
    category: user.category,
    rentPrice: user.rentPrice,
  });
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "movie-delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.dataset.id = authToken;
  deleteBtn.dataset.movieInfo = JSON.stringify({
    title: user.title,
    category: user.category,
    rentPrice: user.rentPrice,
  });

  movieBtnContainer.append(editBtn, deleteBtn);
  card.append(movieTitle, movieCategory, movieRentPrice, movieBtnContainer);

  return card;
};
