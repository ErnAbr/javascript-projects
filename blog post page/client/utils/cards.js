export const cards = (blog) => {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card-styles";
  const blogHeader = document.createElement("h3");
  blogHeader.className = "card-header-style";
  const blogImage = document.createElement("img");
  blogImage.className = "card-image-style";
  const blogText = document.createElement("p");
  blogText.className = "card-text-style";
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "button-wrapper";
  const editLink = document.createElement("a");
  editLink.textContent = "EDIT";
  editLink.className = "edit-button";
  const deleteLink = document.createElement("a");
  deleteLink.textContent = "DELETE";
  deleteLink.className = "delete-button";
  buttonWrapper.append(editLink, deleteLink);

  blogHeader.textContent = blog.title;
  blogImage.src = blog.image;
  blogText.textContent = blog.content;
  deleteLink.id = blog.id;
  editLink.id = blog.id;

  cardDiv.append(blogHeader, blogImage, blogText, buttonWrapper);

  return cardDiv;
};
