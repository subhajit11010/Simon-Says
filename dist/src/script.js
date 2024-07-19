const greenBox = document.getElementsByClassName("box1")[0];
const redBox = document.getElementsByClassName("box2")[0];
const blueBox = document.getElementsByClassName("box3")[0];
const yellowBox = document.getElementsByClassName("box4")[0];
const counter = document.getElementsByClassName("counter")[0];
const pointDiv = document.getElementById("point");
const maxPointDiv = document.getElementById("max-point");
const message = document.getElementById("message");
const container = document.getElementsByClassName("container")[0];
const boxArr = ["greenBox", "redBox", "yellowBox", "blueBox"];
const pointMarked = 0;

var maxPoint = 0;
var points = 0;
var stat = 0;
var gameOver = 1;
document.addEventListener("DOMContentLoaded", () => {
  maxPoint = parseInt(localStorage.getItem("content")) || 0;
});
document.getElementById("starter").addEventListener("click", (e) => {
  startControl(e);
});
function startControl(e) {
  stat = 1;
  if (!gameOver) {
    userData = [];
    comData = [];
    points = 0;
    gameOver = 1;
    clearMessage();
    showPoints();
  }
  if (e.target.textContent === "start" && stat === 1) {
    counter.innerHTML = "";
    e.target.textContent = "quit";
    showPoints();
    startGame();
  } else {
    location.reload();
  }
}
async function startGame() {
  clearMessage();
  selectColor();
  for (let i = 0; i < comData.length; i++) {
    if (stat === 0) {
      break;
    }
    await showColor(comData[i]);
  }

  console.log(comData);
  for (let i = 0; i < comData.length; i++) {
    if (stat === 0) {
      break;
    }
    await getUserData();
    if (stat === 0) {
      break;
    }
    var index = userData.length - 1;

    if (userData[index] !== comData[index] && stat) {
      const audio = new Audio("./res/errorSound.mp3");
      audio.play();
      stat = 0;
      gameOver = 0;
      userData = [];
      comData = [];
      counter.innerHTML = "&#63;";
      document.getElementById("starter").textContent = "start";
      container.style.backgroundColor = "#DF7979";
      setTimeout(() => {
        container.style.backgroundColor = "#494949";
      }, 300);
      message.textContent = "Game Over!!!";
      message.style.fontSize = "1.2rem";
      showPoints();
      return;
    } else {
      if (index === comData.length - 1 && stat) {
        const audio = new Audio("./res/pianoSound.mp3");
        audio.play();
        container.style.backgroundColor = "#00F031";
        setTimeout(() => {
          container.style.backgroundColor = "#494949";
        }, 300);

        points++;
        counter.textContent = points;
        // await delay(300);
        showPoints();
        userData = [];
        stat = 1;
      } else {
        const audio = new Audio("./res/pianoSound.mp3");
        audio.play();
        container.style.backgroundColor = "#00F031";
        setTimeout(() => {
          container.style.backgroundColor = "#494949";
        }, 300);
        stat = 1;
        continue;
      }
    }
  }
  if (stat === 1) {
    startGame();
  }
}

function showColor(choosenColor) {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (choosenColor) {
        case "greenBox":
          greenBox.style.backgroundColor = "#035C03";
          setDefaultColor(choosenColor, 500);
          break;
        case "redBox":
          redBox.style.backgroundColor = "#A10101";
          setDefaultColor(choosenColor, 500);
          break;
        case "yellowBox":
          yellowBox.style.backgroundColor = "#BBBB00";
          setDefaultColor(choosenColor, 500);
          break;
        case "blueBox":
          blueBox.style.backgroundColor = "#000078";
          setDefaultColor(choosenColor, 500);
          break;
      }
      resolve();
    }, 1000);
  });
}

function setDefaultColor(choosenColor, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (choosenColor) {
        case "greenBox":
          greenBox.style.backgroundColor = "green";
          break;
        case "redBox":
          redBox.style.backgroundColor = "red";
          break;
        case "yellowBox":
          yellowBox.style.backgroundColor = "yellow";
          break;
        case "blueBox":
          blueBox.style.backgroundColor = "blue";
          break;
      }
      resolve();
    }, ms);
  });
}

function selectColor() {
  const choosenColor = boxArr[Math.floor(Math.random() * boxArr.length)];
  comData.push(choosenColor);
  return choosenColor;
}
function getUserData() {
  return new Promise((resolve) => {
    function handleClick(e) {
      console.log(e.target.classList);
      if (e.target.classList.contains("box1")) {
        userData.push("greenBox");
        greenBox.style.backgroundColor = "#035C03";
        setDefaultColor("greenBox", 200);
      } else if (e.target.classList.contains("box2")) {
        userData.push("redBox");
        redBox.style.backgroundColor = "#A10101";
        setDefaultColor("redBox", 200);
      } else if (e.target.classList.contains("box3")) {
        userData.push("blueBox");
        blueBox.style.backgroundColor = "#000078";
        setDefaultColor("blueBox", 200);
      } else if (e.target.classList.contains("box4")) {
        userData.push("yellowBox");
        yellowBox.style.backgroundColor = "#BBBB00";
        setDefaultColor("yellowBox", 200);
      }
      console.log(userData);

      // Resolve the promise and remove event listeners
      resolve();
      document.querySelectorAll(".child").forEach((child) => {
        child.removeEventListener("click", handleClick);
      });
    }
    document.querySelectorAll(".child").forEach((child) => {
      child.addEventListener("click", handleClick);
    });
  });
}

function showPoints() {
  pointDiv.textContent = `Points: ${points}`;
  if (maxPoint < points) {
    maxPoint = points;
    localStorage.setItem("content", maxPoint);
  }
  maxPointDiv.textContent = `Highest: ${maxPoint}`;
}

function clearMessage() {
  message.textContent = "";
  if (!stat) counter.innerHTML = "";
}

// function delay(ms) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, ms);
//   });
// }