var displayTime = document.getElementById("current-time");
// set alarm funtion
let alarmList = [];

function updateTime() {
  var today = new Date();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  const ampm = hour >= 12 ? "PM" : "AM";
  // for 12 hour watch
  hour %= 12;
  // 0 || 12 so 0 represents false in that case if hours 0 than it will be 12
  hour = hour || 12;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  const time = `${hour}:${minute}:${second} ${ampm}`;
  displayTime.innerHTML = time;

  setTimeout(function () {
    updateTime();
    if (alarmList.includes(time)) {
      console.log(alarmList.includes(time));
      ringAlarm(time);
    }
  }, 1000);
}
updateTime();

// function for updating options
function upDateOptions() {
  let hour = document.getElementById("hour");
  let minute = document.getElementById("min");
  let second = document.getElementById("sec");
  let hr = 12;
  let min = 59;
  let sec = 59;
  for (i = 1; i <= hr; i++) {
    hour.options[i] = new Option(i < 10 ? "0" + (i - 1) : i);
  }
  for (i = 1; i <= min; i++) {
    minute.options[i] = new Option(i < 10 ? "0" + (i - 1) : i);
  }
  for (i = 1; i <= sec; i++) {
    second.options[i] = new Option(i < 10 ? "0" + (i - 1) : i);
  }
}
upDateOptions();

const setAlarm = document.querySelector(".set-alarm");

setAlarm.addEventListener("submit", function (e) {
  e.preventDefault();
  const hour = setAlarm.hour.value;
  const minute = setAlarm.minute.value;
  const second = setAlarm.second.value;
  const ampm = setAlarm.ampm.value;
  const alarmLable = setAlarm.alarmlable.value;
  if (hour == 0 && minute == 0 && second == 0) {
    alert("please set alarm with some values!");
    return;
  }
  const newAlarm = `${hour}:${minute}:${second} ${ampm}`;
  if (isNaN(newAlarm)) {
    if (!alarmList.includes(newAlarm)) {
      alarmList.push(newAlarm);
      showAlarm(newAlarm, alarmLable);
      setAlarm.reset();
    } else {
      alert(`alarm for ${newAlarm} already set. `);
    }
  } else {
    alert("invalid TIme ");
  }
});

function showAlarm(newAlarm, alarmLable) {
  const html = `<li class = "time-list"><span class = "time">${newAlarm}</span><p class="alarmLable">${alarmLable}</p><button class = "delete" onclick = "remove(this.value)"  value="${newAlarm}">DELETE</button></li>`;

  const alarmli = document.querySelector(".set-alarms-list");
  alarmli.innerHTML += html;
}

// remove alarm

const myList = document.querySelector(".set-alarms-list");

myList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

// Delete alarm
const remove = (value) => {
  let newList = alarmList.filter((time) => time != value);
  alarmList.length = 0;
  alarmList.push.apply(alarmList, newList);
};

// clear alarm
const clearAlarm = () => {
  sound.pause();
  clearTimeout();
  alert("alarm cleared");
};

var sound = new Audio(
  "https://www.freespecialeffects.co.uk/soundfx/music/drum_10.wav"
);
sound.loop = true;

function ringAlarm(time) {
  sound.play();
  sound.play();
  // alert(`hey it is alarming ${time}`);
}
