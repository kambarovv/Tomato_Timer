let total = 1500;
let time = total;
let interval = null;
let sessions = 0;

const progress = document.getElementById("progress");
const timeEl = document.getElementById("time");
const input = document.getElementById("minutes");

const radius = 90;
const circumference = 2 * Math.PI * radius;

progress.style.strokeDasharray = circumference;


function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  return `${m}:${s.toString().padStart(2, "0")}`;
}

function update() {
  timeEl.textContent = formatTime(time);

  let percent = time / total;
  progress.style.strokeDashoffset = circumference * (1 - percent);
}

function getMinutes() {
  let minutes = parseInt(input.value);
  return isNaN(minutes) || minutes <= 0 ? 25 : minutes;
}

function start() {
  if (interval) return;

  total = getMinutes() * 60;
  if (time > total) time = total;

  interval = setInterval(() => {
    if (time <= 0) {
      clearInterval(interval);
      interval = null;

      sessions++;
      document.getElementById("sessions").textContent = sessions;

      timeEl.textContent = "Done!";
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

  time = getMinutes() * 60;
  total = time;

  update();
}


input.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    input.value = parseInt(input.value || 0) + 1;
    reset();
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    input.value = Math.max(1, parseInt(input.value || 0) - 1);
    reset();
  }
});


input.addEventListener("wheel", (e) => {
  e.preventDefault();

  let value = parseInt(input.value || 0);

  if (e.deltaY < 0) {
    value++;
  } else {
    value = Math.max(1, value - 1);
  }

  input.value = value;
  reset();
});


const today = new Date();
document.getElementById("currentDay").innerText = today.toLocaleDateString(
  "en-US",
  {
    month: "long",
    day: "numeric",
  },
);

update();
