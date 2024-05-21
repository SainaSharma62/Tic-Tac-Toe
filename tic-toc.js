let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-game");
let newgame = document.querySelector("#new");
let container = document.querySelector(".win");
let messg = document.querySelector("#msg");
let messg2 = document.querySelector("#nowinner");

let turnO = true;

const winpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click",() =>{
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
        nowinner();
    });
});

//////showwinner---------

const disableBoxes= () =>{
    for(let elem of boxes){
        elem.disabled = true;
    }
}

const enableBoxes= () =>{
    for(let elem of boxes){
        elem.disabled = false;
        elem.innerText = "";
    }
}
const showwinner = (winner) =>{
    messg.innerText = `Congratulation, Winner is ${winner}`;
    container.classList.remove("hide");
    disableBoxes();
}

////////----------------
const checkWinner = () =>{
    for( let pattern of winpatterns){
        let val1 =  boxes[pattern[0]].innerText;
        let val2 =  boxes[pattern[1]].innerText;
        let val3 =  boxes[pattern[2]].innerText;
        if(val1 != "" && val2 != "" && val3 != ""){
            if(val1 === val2 && val2 === val3){
                showwinner(val1);
            }
        }
    }
}

////---------------resetgame-----------

const resetgame = () =>{
    turnO = true;
    enableBoxes();
    container.classList.add("hide");
    messg2.innerText = "";
}
newgame.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);

/////------------------Check Noone winner-----

const nowin = () =>{
    messg2.innerText = `Upps! No One is winner Play again!`;
    container.classList.add("hide");
    enableBoxes();
}

const nowinner = () => {
    let allBoxesFilled = true;
    for (let pattern of winpatterns) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if (val1 === "" || val2 === "" || val3 === "") {
            allBoxesFilled = false;
        }
        if (val1 !== "" && val1 === val2 && val2 === val3) {
            return;
        }
    }
    if (allBoxesFilled) {
        nowin();
    }
}
