let isRunning = false;
let startTime, elapsedTime = 0, timerInterval;
let lapCounter = 1;

// Ensure all time displays show 00 initially
function initializeDisplay() {
    document.getElementById('dayNum').textContent = "00";
    document.getElementById('hourNum').textContent = "00";
    document.getElementById('minuteNum').textContent = "00";
    document.getElementById('secondNum').textContent = "00";
}

function updateTime() {
    const currentTime = Date.now();
    const time = currentTime - startTime + elapsedTime;

    const totalSeconds = Math.floor(time / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);

    document.getElementById('dayNum').textContent = days.toString().padStart(2, '0');
    document.getElementById('hourNum').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minuteNum').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('secondNum').textContent = seconds.toString().padStart(2, '0');
}

function startStopTimer() {
    if (!isRunning) {
        startTime = Date.now();
        timerInterval = setInterval(updateTime, 1000);
        document.getElementById('startStop').textContent = "Pause";
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        document.getElementById('startStop').textContent = "Start";
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    document.getElementById('startStop').textContent = "Start";
    initializeDisplay();
    document.getElementById('lapList').innerHTML = "";
    lapCounter = 1;
}

function recordLap() {
    if (isRunning) {
        const lapTime = `${document.getElementById('dayNum').textContent}:${document.getElementById('hourNum').textContent}:${document.getElementById('minuteNum').textContent}:${document.getElementById('secondNum').textContent}`;
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        document.getElementById('lapList').appendChild(lapElement);
        lapCounter++;
    }
}

// Initialize display with 00 on page load
initializeDisplay();

document.getElementById('startStop').addEventListener('click', startStopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

