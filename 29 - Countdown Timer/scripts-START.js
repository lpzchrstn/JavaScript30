const buttonTimers = [...document.querySelectorAll('button')];
const customTimer = document.querySelector('form#custom');
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
let timer;

function countdownTimer(timeInSeconds) {
  clearInterval(timer);

  // Using this instead of timeInSeconds parameter because setInterval function somtimes stops when page is beoing scrolled on a phone
  const timeAfterCountdown = Date.now() + (timeInSeconds * 1000);
  timeInSeconds = (timeAfterCountdown - Date.now()) / 1000;

  displayRemainingTime(timeInSeconds);
  endTime.innerText = getEndTime(timeInSeconds);

  timer = setInterval(() => {
    timeInSeconds--;
    displayRemainingTime(timeInSeconds);

    if(timeInSeconds === 0) {
      clearInterval(timer);
    }
  }, 1000);
}

function displayRemainingTime(timeInSeconds) {
  timerDisplay.innerText = formatTimeFromSeconds(timeInSeconds);
  document.title = timerDisplay.innerText;
}

function startTimer() {
  const timeInSeconds = parseInt(this.dataset.time);
  countdownTimer(timeInSeconds);
}

function startCustomTimer(e) {
  e.preventDefault();
  const timeInSeconds = parseInt(this.minutes.value) * 60;
  countdownTimer(timeInSeconds);
  this.reset();
}

function formatTimeFromSeconds(timeInSeconds) {
  const hour = Math.floor(timeInSeconds / 3600).toString();
  const minute = Math.floor(timeInSeconds % 3600 / 60).toString();
  const second = Math.floor(timeInSeconds % 3600 % 60).toString();
  const time = `${minute.padStart(2, 0)}:${second.padStart(2, 0)}`;

  return hour > 0 ? `${hour.padStart(2, 0)}:${time}` : time;
}

function getEndTime(timeInSeconds) {
  let time = new Date();
  time.setSeconds(time.getSeconds() + timeInSeconds);
  time = time.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
  return `Be back at ${time}`;
}

buttonTimers.forEach(button => button.addEventListener('click', startTimer));
customTimer.addEventListener('submit', startCustomTimer);
