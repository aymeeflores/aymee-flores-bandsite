let showsArray = [
  {
    date: " Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: " Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: " Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: " Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
];

function displayShow(show) {
  let date = show.date;
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

function addAllShows() {
  for (let i = 0; i < showsArray.length; i++) {
    displayShow(showsArray[i]);
  }
}
addAllShows();
