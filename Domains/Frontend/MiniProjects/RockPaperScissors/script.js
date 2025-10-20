let yPicker = document.querySelectorAll(".btn");
let print = document.querySelector(".comment");
let reset = document.querySelector(".resetBtn");
let scoreC = document.querySelector("#scoreC");
let scoreY = document.querySelector("#scoreY");
let count = 0;
let countY = 1;
let countC = 1;
let storageY = 0;
let storageC = 0;
let cancel = document.querySelector(".cancel");
let popUp = document.querySelector(".pop-up");
let comment1 = document.querySelector(".pop-up-comment");
let printC = document.querySelector("#choicedC");
let printY = document.querySelector("#choicedY");
let comment2 = document.querySelector(".pop-up-title");

const cChoice = () => {
  let opt = ["Rock", "Paper", "Scissors"];
  let i = Math.floor(Math.random() * 3);
  return opt[i];
};

const ShowWinner = (yWin) => {
  if (yWin) {
    winner();
    // console.log(`YOU = ${countY}`);
    storageY = +countY;
  } else {
    loser();
    // console.log(`COMP = ${countC}`);
    storageC = +countC;
  }
  // console.log(storageY);
  // console.log(storageC);
  comparison();
};

const core = (You) => {
  // console.log("you =",You);
  printY.innerText = You;
  let Comp = cChoice();
  // console.log("comp =",Comp);
  printC.innerText = Comp;
  if (You === Comp) {
    draw();
  } else {
    let yWin = true;
    if (You === "Rock") {
      yWin = Comp === "Paper" ? false : true;
    } else if (You === "Paper") {
      yWin = Comp === "Scissors" ? false : true;
    } else {
      yWin = Comp === "Rock" ? false : true;
    }
    ShowWinner(yWin);
  }
  counter();
};

yPicker.forEach((btn) => {
  // console.log(btn);
  btn.addEventListener("click", () => {
    let You = btn.getAttribute("id");
    count++;
    // console.log(count);
    core(You);
  });
});

reset.addEventListener("click", () => {
  // console.log(scoreC);
  scoreC.innerText = "Comp - 0";
  scoreY.innerText = "You - 0";
  no = 1;
  count = 0;
  countY = 1;
  countC = 1;
  scoreC.style.color = "white";
  scoreY.style.color = "white";
  popUp.classList.add("visible");
  print.style.color = "white";
  print.innerText = "Try again Child!!!";
});
const winner = () => {
  // console.log("You Win");
  print.innerText = "You Win";
  scoreY.innerText = `You - ${countY++}`;
  scoreY.style.color = "#36BA98";
  scoreC.style.color = "#E76F51";
  print.style.color = "#36BA98";
};
const loser = () => {
  // console.log("You lose");
  print.innerText = "You lose";
  scoreC.innerText = `Comp - ${countC++}`;
  scoreY.style.color = "#E76F51";
  scoreC.style.color = "#36BA98";
  print.style.color = "#E76F51";
};
const draw = () => {
  // console.log("Its a Draw");
  print.innerText = "Its a Draw";
  print.style.color = "#ffff44";
  scoreY.style.color = "#ffff44";
  scoreC.style.color = "#ffff44";
};

const counter = () => {
  console.log(count);
  if (count % 10 === 0) {
    popUp.classList.remove("visible");
  } else {
    popUp.classList.add("visible");
  }
};

cancel.addEventListener("click", () => {
  popUp.classList.add("visible");
});

const comparison = () => {
  // console.log(storageC);
  // console.log(storageY);

  if (storageY > storageC) {
    comment1.innerText = "You beat me,bruh!!";
    comment2.innerText = "Congratulaions!!!";
  } else if (storageY < storageC) {
    comment1.innerText = "HA!!! loser can't beat me";
    comment2.innerText = "Loser!!!";
  } else {
    comment1.innerText = "I have never such a tough player";
    comment2.innerText = "Tie!!!";
  }
};
