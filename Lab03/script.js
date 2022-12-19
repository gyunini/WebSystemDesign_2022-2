const array = [];

class Clock{
   constructor(clockName, hour, min, sec){
    this.clockName = clockName;
    this.hour = hour;
    this.min = min;
    this.sec = sec;
   }

   getHour() {
    return this.hour
   }

   getMin() {
    return this.min;
   }

   getSec() {
    return this.sec;
   }

   getClock() {
    let clocks = document.getElementById("clockList");
    let clockList = document.createElement("div");
    clocks.appendChild(clockList);
    clockList.innerHTML = `시계[${this.clockName}]: ${this.hour}시 ${this.min}분 ${this.sec}초`;
   }

}

function clock(){
    // let clocks = document.getElementById("clockList");
    // let clockList = document.createElement("div");
    let clockName = prompt("시계의 이름은?");
    let hour = parseInt(prompt("시계의 처음 시간은?"));
    let min = parseInt(prompt("시계의 처음 분은?"));
    let sec = parseInt(prompt("시계의 처음 초는?"));

    let newClock = new Clock(clockName, hour, min, sec); // 새로운 시계 객체 생성
    console.log(newClock);

    newClock.getClock();
    array.push(newClock);
    console.log(array);
    // clocks.appendChild(clockList);
    // clockList.innerHTML = `시계[${newClock.clockName}]: ${newClock.hour}시 ${newClock.min}분 ${newClock.sec}초`;
}

let addClock = document.getElementById("addClock");
addClock.addEventListener("click", clock);



function plusHour(){
    let clocks = document.getElementById("clockList");
    while(clocks.firstChild) {
        clocks.removeChild(clocks.firstChild);
    }

    for (i = 0; i < array.length; i ++) {
        console.log(array[i]);
        console.log(array[i].getHour());
        array[i].hour = array[i].getHour() + 1;
        if(array[i].hour > 23) {
            array[i].hour = 0;
        }
        array[i].getClock();
    }
}

function minusHour(){
    let clocks = document.getElementById("clockList");
    while(clocks.firstChild) {
        clocks.removeChild(clocks.firstChild);
    }

    for (i = 0; i < array.length; i ++) {
        console.log(array[i]);
        console.log(array[i].getHour());
        array[i].hour = array[i].getHour() - 1;
        if(array[i].hour < 0) {
            array[i].hour = 0;
        }
        array[i].getClock();
    }
}

function plusMin(){
    let clocks = document.getElementById("clockList");
    while(clocks.firstChild) {
        clocks.removeChild(clocks.firstChild);
    }

    for (i = 0; i < array.length; i ++) {
        console.log(array[i]);
        console.log(array[i].getMin());
        array[i].min = array[i].getMin() + 10;
        if(array[i].min > 60) {
            array[i].min = 0;
        }
        array[i].getClock();
    }
}

function minusMin(){
    let clocks = document.getElementById("clockList");
    while(clocks.firstChild) {
        clocks.removeChild(clocks.firstChild);
    }

    for (i = 0; i < array.length; i ++) {
        console.log(array[i]);
        console.log(array[i].getMin());
        array[i].min = array[i].getMin() - 10;
        if(array[i].min < 0) {
            array[i].min = 0;
        }
        array[i].getClock();
    }
}

function plusSec(){
    let clocks = document.getElementById("clockList");
    while(clocks.firstChild) {
        clocks.removeChild(clocks.firstChild);
    }

    for (i = 0; i < array.length; i ++) {
        console.log(array[i]);
        console.log(array[i].getSec());
        array[i].sec = array[i].getSec() + 10;
        if(array[i].sec > 60) {
            array[i].sec = 0;
        }
        array[i].getClock();
    }
}

function minusSec(){
    let clocks = document.getElementById("clockList");
    while(clocks.firstChild) {
        clocks.removeChild(clocks.firstChild);
    }

    for (i = 0; i < array.length; i ++) {
        console.log(array[i]);
        console.log(array[i].getSec());
        array[i].sec = array[i].getSec() - 10;
        if(array[i].sec < 0) {
            array[i].sec = 0;
        }
        array[i].getClock();
    }
}

let addHour = document.getElementById("addHour");
addHour.addEventListener("click", plusHour);

// 예외처리 필요: 시계 마이너스, 23시 -> 0시

let subHour = document.getElementById("subHour");
subHour.addEventListener("click", minusHour);

let addMin = document.getElementById("addMin");
addMin.addEventListener("click", plusMin);

let subMin = document.getElementById("subMin");
subMin.addEventListener("click", minusMin);

let addSec = document.getElementById("addSec");
addSec.addEventListener("click", plusSec);

let subSec = document.getElementById("subSec");
subSec.addEventListener("click", minusSec);