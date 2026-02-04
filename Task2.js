let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

// Format time as HH:MM:SS.ms
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");
    let formattedHH = hh.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}.<span class="ms">${formattedMS}</span>`;
}

function print(txt) {
    display.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
}

function pause() {
    clearInterval(timerInterval);
    showButton("START");
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00.<span class='ms'>00</span>");
    elapsedTime = 0;
    lapsList.innerHTML = "";
    showButton("START");
    lapBtn.disabled = true;
}

function lap() {
    const li = document.createElement("li");
    li.classList.add("lap-item");
    li.innerHTML = `<span>Lap ${lapsList.childElementCount + 1}</span> <span>${display.innerHTML}</span>`;
    lapsList.prepend(li); // Add newest lap to the top
}

// UI Toggle Logic
function showButton(buttonKey) {
    if (buttonKey === "PAUSE") {
        startPauseBtn.innerHTML = "Pause";
        startPauseBtn.className = "btn pause";
        lapBtn.disabled = false;
        isRunning = true;
    } else {
        startPauseBtn.innerHTML = "Start";
        startPauseBtn.className = "btn start";
        isRunning = false;
    }
}

// Event Listeners
startPauseBtn.addEventListener("click", () => {
    if (!isRunning) start();
    else pause();
});

resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);