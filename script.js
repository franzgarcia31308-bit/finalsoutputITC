function setActive(button) {
  var buttons = button.parentElement.querySelectorAll("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }
  button.classList.add("active");
}

function filterSpots(category, button) {
  setActive(button);
  var cards = document.querySelectorAll("#spotCards .card");
  for (var i = 0; i < cards.length; i++) {
    if (category === "All" || cards[i].dataset.category === category) {
      cards[i].style.display = "block";
    } else {
      cards[i].style.display = "none";
    }
  }
}

function sortSpots() {
  var container = document.getElementById("spotCards");
  var cards = Array.from(container.children);

  cards.sort(function (a, b) {
    return b.dataset.rating - a.dataset.rating;
  });

  for (var i = 0; i < cards.length; i++) {
    container.appendChild(cards[i]);
  }
}

function filterPhotos(category, button) {
  setActive(button);
  var tiles = document.querySelectorAll(".gallery .tile");
  for (var i = 0; i < tiles.length; i++) {
    if (category === "All" || tiles[i].dataset.category === category) {
      tiles[i].style.display = "flex";
    } else {
      tiles[i].style.display = "none";
    }
  }
}

function openLightbox(tile) {
  var box = document.getElementById("lightboxBox");
  box.innerHTML = "";
  var copy = tile.cloneNode(true);
  copy.removeAttribute("onclick");
  box.appendChild(copy);
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

var cards = document.querySelectorAll("#spotCards .card");
var names = [];
var ratings = [];
var colors = [];

for (var i = 0; i < cards.length; i++) {
  names.push(cards[i].querySelector("h3").textContent);
  ratings.push(Number(cards[i].dataset.rating));

  var cat = cards[i].dataset.category;
  if (cat === "Beach") colors.push("#14808a");
  else if (cat === "Nature") colors.push("#4c9a5c");
  else colors.push("#d9703f");
}

new Chart(document.getElementById("ratingChart"), {
  type: "bar",
  data: {
    labels: names,
    datasets: [{
      label: "Average Rating",
      data: ratings,
      backgroundColor: colors,
      borderRadius: 6
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { y: { min: 0, max: 5 } }
  }
});