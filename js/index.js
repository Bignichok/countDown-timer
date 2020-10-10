import {
  timerSecondsBtns,
  timerControlBtns,
  timerForm,
  timerFormBtn,
  secondsBtns,
  startBtn,
  stopBtn,
} from "./refs.js";
import { displayLeftTime } from "./helpers.js";

let intervalId = null;

const calculateLeftTime = (ms) => {
  const secs = Math.round((ms % (1000 * 60)) / 1000);
  const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  localStorage.setItem("time", JSON.stringify(ms));
  displayLeftTime(secs, mins, hours, days);
};

const defaultState = () => {
  clearInterval(intervalId);
  intervalId = null;
  calculateLeftTime(0);
  stopBtn.setAttribute("disabled", "disabled");

  (startBtn.dataset.action = "start"), (startBtn.textContent = "start");
  secondsBtns.forEach((btn) => btn.removeAttribute("disabled"));
  timerFormBtn.removeAttribute("disabled");
};

const checkLocalStorage = () => {
  const time = JSON.parse(localStorage.getItem("time"));

  if (time) {
    calculateLeftTime(time);
    stopBtn.removeAttribute("disabled", "disabled");
  }
};

const timer = (seconds) => {
  const startedTime = Date.now();
  const remainsTime = seconds * 1000;
  const endTime = startedTime + remainsTime;

  intervalId = setInterval(() => {
    const ms = Math.round(endTime - Date.now());
    if (ms <= 0) {
      defaultState();
      return;
    }
    calculateLeftTime(ms);
  }, 1000);
};

const startTimer = () => {
  const time = JSON.parse(localStorage.getItem("time"));

  if (time) {
    startBtn.textContent = "pause";
    startBtn.dataset.action = "pause";
    stopBtn.removeAttribute("disabled");
    secondsBtns.forEach((btn) => btn.setAttribute("disabled", "disabled"));
    timerFormBtn.setAttribute("disabled", "disabled");
    if (!intervalId) {
      timer(time / 1000);
    }
  }
};

const pauseTimer = () => {
  clearInterval(intervalId);
  intervalId = null;
  startBtn.textContent = "resume";
  startBtn.dataset.action = "start";
};

const stopTimer = () => {
  defaultState();
};

const secondsBtnsHandler = (e) => {
  const value = e.target.dataset.value;
  calculateLeftTime(value * 1000);
};

const secondsFormHandler = (e) => {
  e.preventDefault();
  const target = e.target;
  const value = +target["input-value"].value;
  if (value > 0) {
    calculateLeftTime(value * 1000);
    target.reset();
  }
};

const actionsBtnsHandler = (e) => {
  const action = e.target.dataset.action;
  if (action === "start") startTimer();
  if (action === "pause") pauseTimer();
  if (action === "stop") stopTimer();
};

checkLocalStorage();
timerSecondsBtns.addEventListener("click", secondsBtnsHandler);
timerForm.addEventListener("submit", secondsFormHandler);
timerControlBtns.addEventListener("click", actionsBtnsHandler);
