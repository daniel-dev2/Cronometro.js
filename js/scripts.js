const hoursEL = document.querySelector("#hours")
const minutesEL = document.querySelector("#minutes");
const secondsEL = document.querySelector("#seconds");
const millisecondsEL = document.querySelector("#milliseconds");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resumeBtn = document.querySelector("#resumeBtn");
const resetBtn = document.querySelector("#resetBtn");
const markBtn = document.querySelector("#markBtn");

let interval;
let presses = 0;
let hours = 0
let minutes = 0
let seconds = 0
let milliseconds = 0
let isPaused = false

startBtn.addEventListener("click", startTimer)
pauseBtn.addEventListener("click", pauseTimer)
resumeBtn.addEventListener("click", resumeTimer)
resetBtn.addEventListener("click", resetTimer)
markBtn.addEventListener("click", markTime)

function startTimer() {

    
    isPaused = false // if this function is called then the user wants to start
    interval = setInterval(() => {

        if (!isPaused) {
            milliseconds += 10

            if (milliseconds === 1000) {
                seconds++
                milliseconds = 0
            }

            if (seconds === 60) {
                minutes++
                seconds = 0
            }

            if (minutes === 60) {
                hours++
                minutes = 0
                
            }

            hoursEL.textContent = formatTime(hours)
            minutesEL.textContent = formatTime(minutes)
            secondsEL.textContent = formatTime(seconds)
            millisecondsEL.textContent = formatMilliseconds(milliseconds)
        }
    }, 10);

    startBtn.style.display = "none"
    pauseBtn.style.display = "block"

}


function pauseTimer() {
    isPaused = true
    pauseBtn.style.display = "none"
    markBtn.style.display = "none"
    resumeBtn.style.display = "block"
}


function resumeTimer() {
    isPaused = false
    resumeBtn.style.display = "none"
    pauseBtn.style.display = "block"
    markBtn.style.display = "block"
}


function resetTimer() {
    clearInterval(interval)
    hours = 0
    minutes = 0
    seconds = 0
    milliseconds = 0
    presses = 0

    hoursEL.textContent = "00"
    minutesEL.textContent = "00"
    secondsEL.textContent = "00"
    millisecondsEL.textContent = "000"

    startBtn.style.display = "block"
    markBtn.style.display = "block"
    resumeBtn.style.display = "none"
    pauseBtn.style.display = "none"
    document.getElementById("lap1").innerHTML = ""
    document.getElementById("lap2").innerHTML = ""
    document.getElementById("lap3").innerHTML = ""
}

function markTime() {
    presses++ // user pressed the button
    if (presses === 1) {
        document.getElementById("lap1").innerHTML = `1º ${hoursEL.textContent} : ${minutesEL.textContent} : ${secondsEL.textContent} : ${millisecondsEL.textContent}`
    } else if (presses === 2) {
        document.getElementById("lap2").innerHTML = `2º ${hoursEL.textContent} : ${minutesEL.textContent} : ${secondsEL.textContent} : ${millisecondsEL.textContent}`
    } else if (presses === 3) {
        document.getElementById("lap3").innerHTML = `3º ${hoursEL.textContent} : ${minutesEL.textContent} : ${secondsEL.textContent} : ${millisecondsEL.textContent}`
    }   
    
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time
}

function formatMilliseconds(time) {
    return time < 100 ? `${time}`.padStart(3, "0") : time
}
