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

const updateUI = function () {
  milliseconds.textContent = `${ms}`.slice(-2).padStart(2, "0");
  seconds.textContent = `${sec}`.padStart(2, "0");
  minutes.textContent = `${min}`.padStart(2, "0");
};

const btnSwapDisplay = function (display, hide) {
  display.style.display = "block";
  hide.style.display = "none";
};

const timerStart = function () {
  btnSwapDisplay(btnStop, btnStart);
  clearInterval(timerMilliseconds);
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

const timerStop = function () {
  clearInterval(timerMilliseconds);
  btnSwapDisplay(btnStart, btnStop);
};

const timerReset = function () {
  clearInterval(timerMilliseconds);
  btnSwapDisplay(btnStart, btnStop);
  sec = 0;
  ms = 0;
  min = 0;
  updateUI();
};

let num = 0;
const bookmarkTime = function () {
  if (!ms && !s) return;
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

const clearBookmark = function () {
  num = 0;
  lapContainer.innerHTML = "";
};

btnStart.addEventListener("click", timerStart);
btnStop.addEventListener("click", timerStop);
btnReset.addEventListener("click", timerReset);
btnBookmark.addEventListener("click", bookmarkTime);
btnClear.addEventListener("click", clearBookmark);
