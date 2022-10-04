
// console.log(document.documentElement.clientHeight);
// console.log(document.documentElement.clientWidth);

const X_calss="x";
const Circle_class="circle";
const winning_combinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6],
];

let circleTurn=false;
let cellElment=document.querySelectorAll('[data-cell]');
let board=document.getElementById('board');
let winningTextMessage=document.querySelector(`[data-winning-message]`);
let winningMessgeElement=document.getElementById(`winning-message`);
let restartButton=document.getElementById(`restartButton`);

console.log(cellElment);
 
function startGame(){
    cellElment.forEach(cell=>{
        cell.addEventListener("click",handelClick,{ once:true});
    });
    
    setBoardHover();
}

startGame();

function handelClick(e){
    
    const cell=e.target;
    const currentClass=circleTurn ? Circle_class : X_calss;
    placeMark(cell , currentClass);
    
    if(checkWinnig(currentClass)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
        swapTurns();
        setBoardHover(); 
    }
}

function endGame(draw){
if(draw){
     winningTextMessage.innerText="Draw!"
}else{
    winningTextMessage.innerText=`${circleTurn ? " O is " : "X is "} winner `;
}
    winningMessgeElement.classList.add(`show`);
}

function isDraw(){
    return [...cellElment].every(cel=>{
        return cel.classList.contains(X_calss)||
        cel.classList.contains(Circle_class);
    });
}
function placeMark(cell ,currentClass){
  
    cell.classList.add(currentClass);
    console.log(`added class to cell is  ${currentClass}` );
}

function swapTurns(){
    circleTurn =!circleTurn;
}

function setBoardHover(){
  board.classList.remove(X_calss);
  board.classList.remove(Circle_class);
   if(circleTurn){
       board.classList.add(Circle_class);
   }
   else{
    board.classList.add(X_calss);
   }
}


function checkWinnig(currentClass){
    console.clear();
    console.log(currentClass);
 return winning_combinations.some(condtion=>{
     console.log( condtion.every(index=>{ return  cellElment[index].classList.contains(currentClass);
        }));
        console.log(condtion);
     return condtion.every(index=>{
        console.log(index);
         return  cellElment[index].classList.contains(currentClass);
        });
    });
}


restartButton.addEventListener("click",e=>{
    window.location.reload();
});


