const seconds = document.querySelector(".seconds");
const milliseconds = document.querySelector(".milliseconds");
const minutes = document.querySelector(".minutes");
const btnStart = document.querySelector(".btn-start");
const btnStop = document.querySelector(".btn-stop");
const btnReset = document.querySelector(".btn-reset");
const btnBookmark = document.querySelector(".btn-bookmark");
const btnClear = document.querySelector(".btn-clear");
const lapContainer = document.querySelector(".lap-container");

let sec = 0;
let ms = 0;
let min = 0;
let timerMilliseconds;

/**
 * Renders the value in the DOM
 */
const updateUI = function () {
  milliseconds.textContent = `${ms}`.slice(-2).padStart(2, "0");
  seconds.textContent = `${sec}`.padStart(2, "0");
  minutes.textContent = `${min}`.padStart(2, "0");
};

/**
 * Switches the button from Start to Stop and vice versa
 * @param {HTMLElement} display - gets displayed in the DOM
 * @param {HTMLElement} hide - gets hidden in the DOM
 */
const btnSwapDisplay = function (display, hide) {
  display.style.display = "block";
  hide.style.display = "none";
};

/**
 * Starts the timer.
 */
const timerStart = function () {
  btnSwapDisplay(btnStop, btnStart);
  timerMilliseconds = setInterval(() => {
    if (ms === 100) {
      ms = 0;
      sec++;
    }
    if (sec === 60) {
      sec = 0;
      min++;
    }
    ms++;
    updateUI();
  }, 10);
};

/**
 * Stops the timer
 */
const timerStop = function () {
  clearInterval(timerMilliseconds);
  btnSwapDisplay(btnStart, btnStop);
};

/**
 * Resets the timer back to zero
 */
const timerReset = function () {
  clearInterval(timerMilliseconds);
  btnSwapDisplay(btnStart, btnStop);
  ms = sec = min = 0;
  updateUI();
};

let num = 0;
/**
 * Renders current time in the DOM
 * @returns {undefined} Returns if current time displayer is zero.
 */
const bookmarkTime = function () {
  if (!ms) return;
  num++;
  const markup = `
    <div class="lap-list">
      <h2 class="lap-number">${num}.</h2>
      <h2 class="lap">${min.toString().padStart(2, "0")}m : ${sec
    .toString()
    .padStart(2, "0")}s : ${ms.toString().slice(-2).padStart(2, "0")}</h2>
    </div>
  `;
  lapContainer.insertAdjacentHTML("beforeend", markup);
};

/**
 * Clears the list of laps bookmarked
 */
const clearBookmark = function () {
  num = 0;
  lapContainer.innerHTML = "";
};

btnStart.addEventListener("click", timerStart);
btnStop.addEventListener("click", timerStop);
btnReset.addEventListener("click", timerReset);
btnBookmark.addEventListener("click", bookmarkTime);
btnClear.addEventListener("click", clearBookmark);
