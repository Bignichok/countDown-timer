import { secondsSpan, minutesSpan, hoursSpan, daysSpan } from "./refs.js";

const showHours = () => {
  hoursSpan.style.display = "inline";
};

const showDays = () => {
  daysSpan.style.display = "inline";
};

const hideHours = () => {
  hoursSpan.style.display = "none";
};

const hideDays = () => {
  daysSpan.style.display = "none";
};

const pad = (value) => {
  return String(value).padStart(2, 0);
};

export const displayLeftTime = (secs, mins, hours, days) => {
  secondsSpan.textContent = pad(secs);
  minutesSpan.textContent = pad(mins);

  hours ? showHours() : hideHours();
  days ? showDays() : hideDays();
  hoursSpan.textContent = pad(hours) + " :";
  daysSpan.textContent = pad(days) + " :";
};
