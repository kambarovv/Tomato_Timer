let total = 1500;
let time = total;
let interval = null;
let sessions = 0;

const progress = document.getElementById("progress");
const timeEl = document.getElementById("time");

const radius = 90;
const circumference = 2 * Math.PI * radius;

progress.style.strokeDasharray = circumference;

function update() {
  let m = Math.floor(time / 60);
  let s = time % 60;
  timeEl.textContent = `${m}:${s.toString().padStart(2,"0")}`;

  let percent = time / total;
  progress.style.strokeDashoffset = circumference * (1 - percent);
}

function start() {
  if (interval) return;

  total = document.getElementById("minutes").value * 60;
  if (time > total) time = total;

  interval = setInterval(() => {
    if (time <= 0) {
      clearInterval(interval);
      interval = null;
      sessions++;
      document.getElementById("sessions").textContent = sessions;
      alert("Session Complete 🔥");
      return;
    }
    time--;
    update();
  }, 1000);
}

function pause() {
  clearInterval(interval);
  interval = null;
}

function reset() {
  clearInterval(interval);
  interval = null;
  time = document.getElementById("minutes").value * 60;
  total = time;
  update();
}

update();