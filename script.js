// element fetched for showing current time 
var displayTime = document.getElementById("current-time");
var displayDay = document.getElementById("current-day");

// list of alarms 
let alarmList = [];

// list of weekdays
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];


// function for updating current time to displayTime
function updateTime() {
  var today = new Date();
  // console.log(today);
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  let day = today.getDay();
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
  displayDay.innerHTML = weekday[day];

  setTimeout(function () {
    updateTime();
    if (alarmList.includes(time)) {
      console.log(alarmList.includes(time));
      ringAlarm(time);
    }
  }, 1000);
}
updateTime();

// function for updating options inside the select tag
function upDateOptions() {
  let hour = document.getElementById("hour");
  let minute = document.getElementById("min");
  let second = document.getElementById("sec");
  let hr = 13;
  let min = 60;
  let sec = 60;
  for (i = 1; i <= hr; i++) {
    hour.options[i] = new Option(i <= 10 ? "0" + (i - 1) : i - 1);
  }
  for (i = 1; i <= min; i++) {
    minute.options[i] = new Option(i <= 10 ? "0" + (i - 1) : i - 1);
  }
  for (i = 1; i <= sec; i++) {
    second.options[i] = new Option(i <= 10 ? "0" + (i - 1) : i - 1);
  }
}
upDateOptions();


// set alarm form when submit the below part will execute
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


// showing alarm which are present in the alarmList
function showAlarm(newAlarm, alarmLable) {
  const html = `<li class = "time-list"><span class = "time">${newAlarm}</span><p class="alarmLable">${alarmLable}</p><button class = "delete" onclick = "remove(this.value)"  value="${newAlarm}">DELETE</button></li>`;

  const alarmli = document.querySelector(".set-alarms-list");
  alarmli.innerHTML += html;
}

// remove alarm on click 
const myList = document.querySelector(".set-alarms-list");

myList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

// Delete alarm 
const remove = () => {
  console.log(this);
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


// music through CDN  
var sound = new Audio(
  "https://www.freespecialeffects.co.uk/soundfx/music/drum_10.wav"
);
sound.loop = true;

// function for ringing alarm 
function ringAlarm(time) {
  sound.play();
  sound.play();
  setTimeout(function () {
    alert(`hey it is alarming ${time}`);
  }, 500);
}
