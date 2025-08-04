let hours = 0;
let minutes = 0;
let seconds = 0;
let timer = null;
let lapCount = 0;


function updateDisplay() {
  document.getElementById("hrs").innerText = hours;
  document.getElementById("min").innerText = minutes;
  document.getElementById("sec").innerText = seconds;
  animateCounters();
}
function animateCounters() {
  document.querySelectorAll('.counter').forEach(counter => {
    counter.classList.add('bounce');
    setTimeout(() => counter.classList.remove('bounce'), 200);
  });
}


// start button
document.getElementById("start").onclick = function () {
  if (timer) return;
  timer = setInterval(function () {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
    updateDisplay();
  }, 1000);
};

// reset button
document.getElementById("reset").onclick = function () {
  clearInterval(timer);
  timer = null;
  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
  document.getElementById("lap_times").innerHTML = `
    <tr>
      <th>Laps</th>
      <th>Time</th>
    </tr>
  `;
  lapCount = 0;
};

// stop or lap button
document.getElementById("stop").onclick = function () {
  lapCount++;
  clearInterval(timer);
  timer = null;
  const table = document.getElementById("lap_times");
  const newRow = table.insertRow(-1);
  const lapCell = newRow.insertCell(0);
  const timeCell = newRow.insertCell(1);
  
  lapCell.innerText = lapCount;
  timeCell.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// update disply at the end
updateDisplay();