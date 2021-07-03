const allSeats = document.querySelectorAll('.row .seat')

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const occupancyRate = 25;

populateUI();
populateOccupiedSeats();

let ticketPrice = +movieSelect.value;

console.log(ticketPrice);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function populateOccupiedSeats() {
  const selectedSeats = JSON.parse(
    localStorage.getItem('selectedSeats')
  );
  
  allSeats.forEach(function (seat, index) {
    if (selectedSeats !== null && selectedSeats.length > 0) {
      if (!allSeats[index].classList.contains('selected')) {
        if (getRandomInt(100) > (100 - occupancyRate)) {
          seat.classList.add('occupied');
        }
      }
    }
  })
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and seat count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selected seats into array, map through array,
  // and return new array indices

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  console.log(seatsIndex);

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  // console.log(selectedSeatsCount);

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from local storage to populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')
  );

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
    }
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
  // console.log(e.target);
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    console.log(e.target);

    updateSelectedCount();
  }
});

// Set initial count and total 
updateSelectedCount();