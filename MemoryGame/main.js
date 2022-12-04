///Defination
let boxImg = document.querySelectorAll(`.box-img`);
let boxFront = document.querySelectorAll(`.box-img .front`);
let spanWrong = document.querySelector(`.wrongs span`);
let successSound = document.querySelector("audio.success");
let failSound = document.querySelector(`audio.fail`);
let nameUser = document.querySelector(`.info-game .name-box`);
let spanTimer = document.querySelector(`.timer`);
let overlay = document.querySelector(`.overlay`);
let btnOverlay = document.querySelector(`.overlay button`);
let btnGear = document.querySelector(`.setting-game .icon-setting`);
let inputCounter = document.querySelector(`.setting-game input `);
let btnSet = document.querySelector(`.setting-game .option-box > button `);
let btnStop = document.querySelector(`.setting-game .option-box  .stop `);
let img1, img2;
let parent1, parent2;
let stateImg = 0;
let wrong = 0;
let orderArray;
let startTime = 1;
let time = startTime * 180;
let idInterval;

loadGame();
// nameUser.innerHTML+=window.prompt("Enter You Name");

//Funcations

function loadGame() {
  orderArray = shuffle([...boxImg.keys()]);
  console.log(orderArray);

  boxImg.forEach((box, index) => {
    box.addEventListener("click", clickedBox);
    box.style.order = orderArray[index];
  });
}

function shuffle(array) {
  let current, temp, random;

  current = array.length;
  while (current > 0) {
    // console.log(`current is ${current}`);
    random = Math.floor(Math.random() * current);
    current--;

    temp = array[current];

    array[current] = array[random];

    array[random] = temp;
  }
  return array;
}

function checkEndGame() {
  return [...boxImg].every((box) => {
    return box.classList.contains("success");
  });
}

function editWrong() {
  wrong++;
  spanWrong.innerHTML = wrong;
}

function removeActive(reset) {
  boxImg.forEach((box) => {
    if (!box.classList.contains("success")) box.classList.remove("active");
    if (reset) {
      box.classList.remove(`active`);
      box.classList.remove(`success`);
    }
  });
}

function clickedBox(e) {
  stateImg++;
  if (stateImg > 2) {
    stateImg = 1;
    removeActive(false);
  }

  e.target.parentElement.classList.add("active");

  if (stateImg === 1) {
    parent1 = e.target.parentElement;
    img1 = e.target.parentElement.querySelector(`img`).src;
  } else if (stateImg === 2) {
    parent2 = e.target.parentElement;
    img2 = e.target.parentElement.querySelector(`img`).src;

    if (img1 === img2) {
      successSound.play();
      parent1.classList.add("success");
      parent2.classList.add("success");
      checkEndGame() ? window.alert("End Game") : "";
    } else {
      failSound.play();
      editWrong();
    }
  }
}

// console.log(idInterval);
idInterval = setInterval(updateCountDown, 1000);
// console.log(idInterval);

function updateCountDown() {
  let minite = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  // console.log(`start time ${startTime} and time is ${time}`);
  spanTimer.innerHTML = `${minite} : ${seconds}`;

  time--;
  if (time === 0) {
    overlay.classList.add("show");
    clearInterval(idInterval);
  }
}

function btnRestart(e) {
  removeActive(true);
  startTime = 2;
  time = startTime * 60;
  wrong = 0;
  overlay.classList.remove("show");
  console.log(`enter exit`);
  idInterval = setInterval(updateCountDown, 1000);
  loadGame();
}

function setCounter() {
  let valueinput = inputCounter.value;
  if (valueinput !== null || valueinput !== "") {
    startTime = valueinput;
    time = startTime * 60;
    idInterval = setInterval(updateCountDown, 100);
  }
}

//set ?? for Box Image

boxFront.forEach((box) => {
  box.innerHTML += "?";
});

btnOverlay.addEventListener("click", btnRestart);

btnGear.addEventListener("click", (e) => {
  document.querySelector(`.setting-game`).classList.toggle(`show`);
});

btnSet.addEventListener("click", setCounter);
btnStop.addEventListener("click", (e) => {
  clearInterval(idInterval);
});
