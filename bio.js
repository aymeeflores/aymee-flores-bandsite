let button = document.getElementById("commentButton");

button.addEventListener("click", function (e) {
  e.preventDefault();
  let name = document.getElementById("inputName");
  let comment = document.getElementById("inputComment");
  let container = document.getElementById("comments_list");
  let date = new Date().toLocaleDateString();

  if (name.value === "" || comment.value === "") {
    name.classList.add("comments__input--error");
    comment.classList.add("comments__input--error");
    return;
  }

  let commentContainer = document.createElement("div");
  commentContainer.classList.add("comments__item");

  let avatarWrapper = document.createElement("div");
  avatarWrapper.classList.add("comments__item__avatar");

  let avatar = document.createElement("div");
  avatar.classList.add("comments__avatar");

  avatarWrapper.appendChild(avatar);
  commentContainer.appendChild(avatarWrapper);

  let rightSide = document.createElement("div");
  rightSide.classList.add("comments__item__rightside");

  let commentsTitle = document.createElement("div");
  commentsTitle.classList.add("comments__item__title");

  let commentsName = document.createElement("div");
  commentsName.classList.add("comments__item__name");
  commentsName.innerText = name.value;
  commentsTitle.appendChild(commentsName);

  let commentsDate = document.createElement("div");
  commentsDate.classList.add("comments__item__date");
  commentsDate.innerText = date.value;
  commentsTitle.appendChild(commentsDate);

  rightSide.appendChild(commentsTitle);

  let commentContent = document.createElement("div");
  commentContent.classList.add("comments__item__content");
  commentContent.innerText = comment.value;
  rightSide.appendChild(commentContent);

  commentContainer.appendChild(rightSide);

  container.prepend(commentContainer);
  if (name.classList.contains("comments__input--error")) {
    name.classList.remove("comments__input--error");
  }

  if (comment.classList.contains("comments__input--error")) {
    comment.classList.remove("comments__input--error");
  }
});
