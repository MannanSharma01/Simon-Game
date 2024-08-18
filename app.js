function startGame()
{
  if(gameActive===false)
  {
    gameActive=true;
    level= 1;   // , score=0
    
    let para=document.querySelector("p");
    para.innerText="Level-1";
    aRandomBoxFlash();

  }
}


function aRandomBoxFlash()
{
  let randNo=Math.ceil((Math.random())*4);
  let randBox=document.querySelector(`.grid-item:nth-of-type(${randNo})`);
  randBox.classList.add("white-bg");
  let abc= function()
  {
    randBox.classList.remove("white-bg");
  }
  setTimeout(abc, 370);
  //-------------------track the random box that flashed----------
  gameSeq.push(randBox);
}


function storeBoxClickedByUser()
{
  if(gameActive===true)
  {
    userBoxPress.push(this);
    console.log(userBoxPress);
  }
}

function checkIfSeqEnteredByUserIsCorrectOrNot() {
  if (gameActive === true) {
    if (gameSeq.length === userBoxPress.length) {
      let i, c = 0;
      for (i = 0; i < gameSeq.length; i++) {
        if (gameSeq[i] === userBoxPress[i]) {
          c++;
        }
      }
      if (c === gameSeq.length) {
        correctProceedFurther();
      } else {
        incorrectProceedFurther();
      }
    } else {
      incorrectProceedFurther();
    }
  }
}

function correctProceedFurther()
{
  userBoxPress=[];
  level++;
  
  (document.querySelector("p")).innerText=`Level-${level}` ;
  aRandomBoxFlash();
}

function incorrectProceedFurther(){
  if(userBoxPress.length >= gameSeq.length)
  {
    gameActive=false;
    gameSeq=[];
    userBoxPress=[];

    (document.querySelector("p")).innerText=`GAME OVER! Score: ${level-1}. Press any key to restart.`;
    scoreStore.push(level-1);
    (document.querySelector("h3")).innerText=`High Score: ${highSc()}`;
  }
}

function highSc()
{
  let i, m=scoreStore[0];
  for(i=0; i<scoreStore.length; i++)
  {
    if(scoreStore[i] >= m)
    {
      m=scoreStore[i];
    }
  }
  return m;
}

//--------------------------------------------------------------------------

let gameActive=false;
let level;
let userBoxPress=[];
let gameSeq=[];
let scoreStore=[];

document.addEventListener("keydown", startGame);

let boxes=document.querySelectorAll(".grid-item");
for(aBox of boxes)
{
  aBox.addEventListener("click", storeBoxClickedByUser);    
  aBox.addEventListener("click", checkIfSeqEnteredByUserIsCorrectOrNot);
}