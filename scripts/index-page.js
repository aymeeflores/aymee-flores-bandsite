let commmentArray = [];
let apiKey = "17e77cc7-b651-41d0-8184-3cf3e455a8b4";
let api_url = "https://project-1-api.herokuapp.com";

axios
	.get(`${api_url}/comments?api_key=${apiKey}`)
	.then(function (response) {
		response.data.forEach(function (elem) {
			commmentArray.push({
				name: elem.name,
				content: elem.comment,
				date: elem.timestamp,
			});
		});
		addAllComments();
	})
	.catch(function (error) {
		console.log(error);
	});

function saveNewComment(name, comment) {
	axios({
		url: `${api_url}/comments?api_key=${apiKey}`,
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		data: JSON.stringify({
			name: name,
			comment: comment,
		}),
	})
		.then(function (response) {
			let elem = response.data;
			commmentArray.push({
				name: elem.name,
				content: elem.comment,
				date: elem.timestamp,
			});
			addAllComments();
		})
		.catch(function (error) {
			console.log(error);
		});
}

let button = document.getElementById("commentButton");

button.addEventListener("click", function (e) {
	e.preventDefault();
	let name = document.getElementById("inputName");
	let comment = document.getElementById("inputComment");
	let container = document.getElementById("comments_list");

	if (name.value === "" || comment.value === "") {
		name.classList.add("comments__input--error");
		comment.classList.add("comments__input--error");
		return;
	}

	if (name.classList.contains("comments__input--error")) {
		name.classList.remove("comments__input--error");
	}

	if (comment.classList.contains("comments__input--error")) {
		comment.classList.remove("comments__input--error");
	}

	saveNewComment(name.value, comment.value);
});

function addAllComments() {
	// clear all comments
	document.getElementById("comments_list").innerHTML = "";
	for (let i = 0; i < commmentArray.length; i++) {
		// insert all comments again
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
	commentsDate.setAttribute("data-date", date);
	// commentsDate.innerText = date;
	commentsTitle.appendChild(commentsDate);

	rightSide.appendChild(commentsTitle);

	let commentContent = document.createElement("div");
	commentContent.classList.add("comments__item__content");
	commentContent.innerText = content;
	rightSide.appendChild(commentContent);

	commentContainer.appendChild(rightSide);

	container.prepend(commentContainer);
}

// addAllComments();

setInterval(function () {
	let dates = document.querySelectorAll(".comments__item__date");

	dates.forEach(function (elem) {
		let currentDate = Number(elem.getAttribute("data-date"));
		elem.innerText = moment(currentDate).fromNow();
	});
}, 1000);
