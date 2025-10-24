let gameSeq = [];
let userSeq = [];

let btns = ["red" , "green" , "yellow" , "purple"];

let started = false;

let level = 0;

let h2 = document.querySelector("h2");
let body = document.querySelector("body");

document.addEventListener("keypress" , () => {
    if(started == false){
        console.log("game is started");
        started = true;
        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function (){
        btn.classList.remove("gameflash");
    } , 250)
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    } , 250)
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;
    let randomIdx = Math.floor(Math.random()*btns.length);
    let randColor = btns[randomIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}


function checkAns(idx){
    // console.log("Current level :" , level);
    if(gameSeq[idx] === userSeq[idx]){
        if(gameSeq.length === userSeq.length){
            setTimeout(levelUp , 1000);
        }
    }else{
       h2.innerHTML= `GAME OVER! , your score was <b>${level}</b> </br>Press any key to start the game`;
       document.querySelector("body").style.backgroundColor = "red";
       setTimeout(function (){
        document.querySelector("body").style.backgroundColor = "white";
       } , 250)
       reset();
    }
}


function btnPress(btn){
    btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}



let allBtn = document.querySelectorAll(".btn");

for(btn of allBtn){
    btn.addEventListener("click" , btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}