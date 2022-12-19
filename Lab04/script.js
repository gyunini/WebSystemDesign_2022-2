// 실습 영상 10분 예시 확인
// 19분 then함수가 promise객체를 반환하지 않아서 원하지 않는 결과 나올수도

const icon = [
    {name: "🧡", time: 500},
    {name: "💛", time: 1000},
    {name: "💚", time: 1500}
];
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let add = document.getElementById("add");
let emoji = document.getElementById("icons");
let mask = false;
let iconList2;
let i = 0;
let temp;

start.addEventListener("click", startFunction);

stop.addEventListener("click", () => {
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
    document.getElementById("add").disabled = false;
    iconList2 = document.createElement("div");
    emoji.prepend(iconList2);
    iconList2.innerHTML = "⛔️"
    mask = true;
});

add.addEventListener("click", addFunction);

function printIcon(i, time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(icon[i]);
        }, time);
    })
}

function addFunction() {
    let name = prompt("enter nex icon");
    let time = parseInt(prompt("enter interval"));
    icon.splice(temp, 0, {name, time});
    console.log(icon);
}

async function startFunction() {
    console.log("시작함수 시작");
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
    document.getElementById("add").disabled = true;
    while(true) {
        let iconList = document.createElement("div");
        let res = await printIcon(i, icon[i].time);
        let now = new Date();
        if(mask) {
            temp = i;
            break;
        }
        if(i === 0) {
            iconList2 = document.createElement("div");
        }
        emoji.prepend(iconList);
        if ( i < icon.length - 1 ) {
            i++;
        } else {
            i = 0;
        }
        iconList.innerHTML = res.name + now;        
    }
    mask = false;
}
