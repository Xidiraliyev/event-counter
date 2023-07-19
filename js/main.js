const form = document.querySelector("#form");
const event_name = document.querySelector("#event_name");
const event_date = document.querySelector("#event_date");
const count_btn = document.querySelector("#count_btn");
const timer_wrapper = document.querySelector("#timer__wrapper");
const container = document.querySelector(".container");
const timer__event_name = document.querySelector("#timer__event_name");
const congrate = document.querySelector('.congrate')
let deadline = "2023-07-20";

let arr = [
  {
    event_name: "",
    event_date: "",
    event_time: "",
  },
];

if (localStorage.getItem("countdown")) {
  arr = JSON.parse(localStorage.getItem('countdown'));
  deadline = arr[0].event_date;
  timer__event_name.innerHTML = arr[0].event_name;
  setClock("timer", deadline);
  container.style.visibility = "hidden";
  timer_wrapper.style.visibility = "visible";
}else {
  setCountevent()
}
// set localStorage
function setCountevent() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    arr[0].event_name = event_name.value;
    arr[0].event_date = event_date.value;
    localStorage.setItem("countdown", JSON.stringify(arr));
    deadline = event_date.value;
    timer__event_name.innerHTML = event_name.value;
    setClock("timer", deadline);
    container.style.visibility = "hidden";
    timer_wrapper.style.visibility = "visible";
  });
}

// Timer

function getTimeRemaining(endtime) {
  const timer = Date.parse(endtime) - Date.parse(new Date()),
    days = Math.floor(timer / (1000 * 60 * 60 * 24)),
    hours = Math.floor((timer / (1000 * 60 * 60)) % 24),
    minutes = Math.floor((timer / 1000 / 60) % 60),
    seconds = Math.floor((timer / 1000) % 60);

  return { timer, days, hours, minutes, seconds };
}

function getZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}
function setClock(selector, endtime) {
  const timer = document.querySelector(selector),
    days = document.querySelector("#days"),
    hours = document.querySelector("#hours"),
    minutes = document.querySelector("#minutes"),
    seconds = document.querySelector("#seconds"),
    timeInterval = setInterval(updateClock, 1000);

  updateClock();
  function updateClock() {
    const t = getTimeRemaining(endtime);
    days.innerHTML = getZero(t.days);
    hours.innerHTML = getZero(t.hours);
    minutes.innerHTML = getZero(t.minutes);
    seconds.innerHTML = getZero(t.seconds);

    if (t.timer <= 0) {
      clearInterval(timeInterval);
      container.style.visibility = 'hidden'
      timer_wrapper.style.visibility = 'hidden'
      congrate.style.visibility = 'visible'
    }
  }
  console.log("done");
}
