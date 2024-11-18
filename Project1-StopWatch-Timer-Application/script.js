const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const milisecondsLabel = document.getElementById('miliseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('PauseBtn');
const resetButton = document.getElementById('ResetBtn');

const lapList=document.getElementById('laplist');

let minutes = 0;
let seconds = 0;
let miliseconds = 0;
let interval;

startButton.addEventListener('click',startTimer);
stopButton.addEventListener('click',stopTimer);
pauseButton.addEventListener('click',pauseTimer);
resetButton.addEventListener('click',resetTimer);

function startTimer(){
    interval=setInterval(updateTimer,10);
    startButton.disabled=true;
    //
    pauseButton.disabled=false;
}
function stopTimer(){
    clearInterval(interval);
    //
    displayTimer();
    //resetTimer();
    addToLapList();
    startButton.disabled=false;
    pauseButton.disabled=true;
}
function pauseTimer(){
    clearInterval(interval);
    interval=null;
    startButton.disabled=false;
    pauseButton.disabled=true;
}
function resetTimer(){
    clearInterval(interval);
    miliseconds=0;
    seconds=0;
    minutes=0;
    displayTimer();
    // resetTimerdata();
    startButton.disabled=false;
    pauseButton.disabled=true;
    lapList.innerHTML="";
}
function updateTimer(){
    miliseconds++;
    if(miliseconds===100){
        miliseconds=0;
        seconds++;
        if(seconds===60){
            seconds=0;
            minutes++;
        }
    }
    displayTimer();
}
function displayTimer(){
    milisecondsLabel.textContent = padTime(miliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}
function padTime(time){
    return time.toString().padStart(2,'0');
}
function addToLapList(){
    const lapTime =`${padTime(minutes)}:${padTime(seconds)}:${padTime(miliseconds)}`;
    const listItem = document.createElement('li');
    listItem.innerHTML=`<span>Lap ${lapList.childElementCount + 1}:</span>${lapTime}`;
    lapList.appendChild(listItem);
}