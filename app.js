document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground-moving");

  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 3;
  let isGameOver = false;
  let gap = 430;
  let score = 0;

  const startGame = () => {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  };
  let gameIimerId = setInterval(startGame, 20);
  //   clearInterval(timerId);
  const jump = () => {
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = birdBottom + "px";
    console.log(birdBottom);
  };

  const control = (e) => {
    if (e.keyCode === 32) jump();
  };

  document.addEventListener("keyup", control);

  const generateObstacle = () => {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight;

    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");

    if (!isGameOver) {
      obstacle.classList.add("obstacle");
      topObstacle.classList.add("topObstacle");
    }
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);

    obstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";

    topObstacle.style.left = obstacleLeft + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    const moveObstacle = () => {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";

      if (obstacleLeft === -60) {
        clearInterval(timerId);
        score += 1;
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }
      if (
        (obstacleLeft > 200 &&
          obstacleLeft < 280 &&
          birdLeft === 220 &&
          (birdBottom < obstacleBottom + 153 ||
            birdBottom > obstacleBottom + gap - 200)) ||
        birdBottom === 0 ||
        birdBottom < 0
      ) {
        gameOver();
        clearInterval(timerId);
      }
    };
    let timerId = setInterval(moveObstacle, 20);

    if (!isGameOver) setTimeout(generateObstacle, 3000);
  };

  generateObstacle();

  const gameOver = () => {
    clearInterval(gameIimerId);
    console.log("Game over");
    isGameOver = true;
    document.removeEventListener("keyup", control);
    ground.classList.add("ground");
    ground.classList.remove("ground-moving");
    gameDisplay.innerHTML = score;
    // ground.innerHTML = score;
  };
});
