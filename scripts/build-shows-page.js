let showsArray = [];
let apiKey = "17e77cc7-b651-41d0-8184-3cf3e455a8b4";
let api_url = "https://project-1-api.herokuapp.com";

axios
	.get(`${api_url}/showdates?api_key=${apiKey}`)
	.then(function (response) {
		response.data.forEach(function (elem) {
			let obj = {
				date: elem.date,
				venue: elem.place,
				location: elem.location,
			};
			showsArray.push(obj);
			displayShow(obj);
		});
	})
	.catch(function (error) {
		console.log(error);
	});

function displayShow(show) {
	let date = moment(Number(show.date)).format("ddd MMM DD");
	let venue = show.venue;
	let location = show.location;

	let showContainer = document.createElement("article");
	showContainer.classList.add("shows__details");

	let dateLabel = document.createElement("h3");
	dateLabel.classList.add("shows__subtitles");
	dateLabel.innerText = "date";
	showContainer.appendChild(dateLabel);

	let showDate = document.createElement("p");
	showDate.classList.add("shows__text");
	showDate.innerText = date;
	showContainer.appendChild(showDate);

	let venueLabel = document.createElement("h3");
	venueLabel.classList.add("shows__subtitles");
	venueLabel.innerText = "Venue";
	showContainer.appendChild(venueLabel);

	let showVenue = document.createElement("p");
	showVenue.classList.add("shows__text");
	showVenue.innerText = venue;
	showContainer.appendChild(showVenue);

	let locationLabel = document.createElement("h3");
	locationLabel.classList.add("shows__subtitles");
	locationLabel.innerText = "location";
	showContainer.appendChild(locationLabel);

	let showLocation = document.createElement("p");
	showLocation.classList.add("shows__text");
	showLocation.innerText = location;
	showContainer.appendChild(showLocation);

	let button = document.createElement("button");
	button.classList.add("shows__tickets");
	button.innerText = " Buy Tickets";
	button.addEventListener("click", function () {
		console.log(venue);
	});
	showContainer.appendChild(button);

	document.querySelector(".shows").appendChild(showContainer);
}

// function addAllShows() {
// 	for (let i = 0; i < showsArray.length; i++) {
// 		displayShow(showsArray[i]);
// 	}
// }
// addAllShows();
