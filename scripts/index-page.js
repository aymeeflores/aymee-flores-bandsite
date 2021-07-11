const api_key = "17e77cc7-b651-41d0-8184-3cf3e455a8b4";
const api_url = "https://project-1-api.herokuapp.com";

const comments_api =
	"https://project-1-api.herokuapp.com/comments?api_key=" + api_key;

let commmentArray = [];

function getComments() {
	axios
		.get(comments_api)
		.then(function (response) {
			commmentArray = response.data;
			// create single item for each comment in array
			response.data.sort((a, b) => {
				return a.timestamp - b.timestamp;
			});
			response.data.forEach((elem) => createCommentItem(elem));
		})
		.catch(function (error) {
			console.log(error);
		});
}

function postComment(e) {
	e.preventDefault();
	let name = document.getElementById("inputName");
	let comment = document.getElementById("inputComment");

	// remove previous errors
	name.classList.remove("comments__input--error");
	comment.classList.remove("comments__input--error");

	// check errors
	if (name.value === "") {
		name.classList.add("comments__input--error");
		return;
	}
	if (comment.value === "") {
		comment.classList.add("comments__input--error");
		return;
	}

	// store comment
	axios
		.post(comments_api, {
			name: name.value,
			comment: comment.value,
		})
		.then(function (response) {
			// push into array
			commmentArray.push(response.data);
			// create single element from post
			createCommentItem(response.data);

			// reset inputs
			name.value = "";
			comment.value = "";
		})
		.catch((error) => console.log(error));
}

function updateCommentLikes(comment_id) {
	axios
		.put(api_url + "/comments/" + comment_id + "/like?api_key=" + api_key)
		.then(function (response) {
			let likes = document.getElementById("likes" + comment_id);
			likes.innerText = response.data.likes;
		})
		.catch(function (error) {
			console.log(error);
		});
}

function deleteComment(comment_id) {
	axios
		.delete(api_url + "/comments/" + comment_id + "?api_key=" + api_key)
		.then(function (response) {
			document.getElementById(comment_id).remove();
		})
		.catch(function (error) {});
}

function createCommentItem(obj) {
	let name = obj.name;
	let date = obj.timestamp;
	let content = obj.comment;
	let likes = obj.likes;

	let container = document.getElementById("comments_list");

	let commentContainer = document.createElement("div");
	commentContainer.classList.add("comments__item");
	commentContainer.setAttribute("id", obj.id);

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
	commentsDate.setAttribute("data-date", date);
	commentsTitle.appendChild(commentsDate);

	rightSide.appendChild(commentsTitle);

	let commentContent = document.createElement("div");
	commentContent.classList.add("comments__item__content");
	commentContent.innerText = content;
	rightSide.appendChild(commentContent);

	let statusLikesContainer = document.createElement("div");
	let btnLike = document.createElement("button");
	btnLike.setAttribute("type", "button");
	btnLike.setAttribute("data-id", obj.id);
	btnLike.classList.add("do_add_like");
	btnLike.addEventListener("click", onBtnLikeClick);
	btnLike.innerHTML = '<span class="material-icons">favorite</span>';

	let likesCount = document.createElement("span");
	likesCount.setAttribute("id", "likes" + obj.id);
	likesCount.innerText = likes;
	statusLikesContainer.appendChild(btnLike);
	statusLikesContainer.appendChild(likesCount);

	let btnDelete = document.createElement("button");
	btnDelete.setAttribute("type", "button");
	btnDelete.setAttribute("data-id", obj.id);
	btnDelete.classList.add("do_delete");
	btnDelete.addEventListener("click", onBtnDeleteClick);
	btnDelete.innerHTML = '<span class="material-icons">delete</span>';

	let statusContainer = document.createElement("div");
	statusContainer.classList.add("comments__item__statusbar");

	statusContainer.appendChild(statusLikesContainer);
	statusContainer.appendChild(btnDelete);

	rightSide.appendChild(statusContainer);

	commentContainer.appendChild(rightSide);

	container.prepend(commentContainer);
}

let frm = document.getElementById("add_comment_frm");
frm.addEventListener("submit", postComment);

// fetch all comments
getComments();

// dynamic dates
setInterval(function () {
	let dates = document.querySelectorAll(".comments__item__date");

	dates.forEach(function (elem) {
		let currentDate = Number(elem.getAttribute("data-date"));
		elem.innerText = moment(currentDate).fromNow();
	});
}, 1000);

// DIVING DEEPER
function onBtnLikeClick(e) {
	let comment_id = this.getAttribute("data-id");
	updateCommentLikes(comment_id);
}

function onBtnDeleteClick(e) {
	let comment_id = this.getAttribute("data-id");
	if (confirm("Are you sure you want to delete?")) {
		deleteComment(comment_id);
	}
}
