let commmentArray = [
  {
    name: "Miles Acosta",
    content:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    date: new Date(2020, 11, 20).toLocaleDateString(),
  },
  {
    name: "Emilie Beach",
    content:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    date: new Date(2021, 0, 09).toLocaleDateString(),
  },
  {
    name: "Connor Walton",
    content:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    date: new Date(2021, 1, 17).toLocaleDateString(),
  },
];

let button = document.getElementById("commentButton");

button.addEventListener("click", function (e) {
  e.preventDefault();
  let name = document.getElementById("inputName");
  let comment = document.getElementById("inputComment");
  let date = new Date().toLocaleDateString();
  let container = document.getElementById("comments_list");

  if (name.value === "" || comment.value === "") {
    name.classList.add("comments__input--error");
    comment.classList.add("comments__input--error");
    return;
  }
  commmentArray.push({
    name: name.value,
    content: comment.value,
    date: date,
  });
  container.innerHTML = "";
  name.value = "";
  comment.value = "";
  addAllComments();
  if (name.classList.contains("comments__input--error")) {
    name.classList.remove("comments__input--error");
  }

  if (comment.classList.contains("comments__input--error")) {
    comment.classList.remove("comments__input--error");
  }
});

function addAllComments() {
  for (let i = 0; i < commmentArray.length; i++) {
    displayComment(commmentArray[i]);
  }
}

function displayComment(comment) {
  let name = comment.name;
  let content = comment.content;
  let container = document.getElementById("comments_list");
  let date = comment.date;

  let commentContainer = document.createElement("div");
  commentContainer.classList.add("comments__item");

  let avatarWrapper = document.createElement("div");
  avatarWrapper.classList.add("comments__item__avatar");

  let avatar = document.createElement("div");
  avatar.classList.add("comments__avatar2");

  avatarWrapper.appendChild(avatar);
  commentContainer.appendChild(avatarWrapper);

  let rightSide = document.createElement("div");
  rightSide.classList.add("comments__item__rightside");

  let commentsTitle = document.createElement("div");
  commentsTitle.classList.add("comments__item__title");

  let commentsName = document.createElement("div");
  commentsName.classList.add("comments__item__name");
  commentsName.innerText = name;
  commentsTitle.appendChild(commentsName);

  let commentsDate = document.createElement("div");
  commentsDate.classList.add("comments__item__date");
  commentsDate.innerText = date;
  commentsTitle.appendChild(commentsDate);

  rightSide.appendChild(commentsTitle);

  let commentContent = document.createElement("div");
  commentContent.classList.add("comments__item__content");
  commentContent.innerText = content;
  rightSide.appendChild(commentContent);

  commentContainer.appendChild(rightSide);

  container.prepend(commentContainer);
}

addAllComments();
