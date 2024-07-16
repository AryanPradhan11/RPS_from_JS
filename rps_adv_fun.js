let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    loss: 0,
    ties: 0,
  };
  
  updateScoreElement();

  /*function autoPlay() {
    setInterval(function() {
      //using compMove to generate random moves and calling function playGame at 700ms of interval
      const playerMove = compMove();
      playGame(playerMove);
    }, 700);
  }*/

  //setInterval returns an ID and storing it in intervalId outside the function so that the id doesn't change
  //if isAutoPlaying is false the computer will play and if clicked the button again, it will stop it
  let isAutoPlaying = false;
  let intervalId;

  function autoPlay() {
    if(!isAutoPlaying) {
      intervalId = setInterval(() => {
        const playerMove = compMove();
        playGame(playerMove);
      }, 700)
      isAutoPlaying = true;
    }
    else {
      //by using clearInterval function here below with parameter intervalId
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }
  
  function playGame(playerMove) {
    const comp = compMove();
    let result = "";
  
    if (playerMove === "rock") {
      if (comp === "rock") {
        result = "Tie.";
      } else if (comp === "paper") {
        result = "You lose.";
      } else if (comp === "scissors") {
        result = "You win.";
      }
    } else if (playerMove === "paper") {
      if (comp === "rock") {
        result = "You win.";
      } else if (comp === "paper") {
        result = "Tie.";
      } else if (comp === "scissors") {
        result = "You lose.";
      }
    } else if (playerMove === "scissors") {
      if (comp === "rock") {
        result = "You lose.";
      } else if (comp === "paper") {
        result = "You win.";
      } else if (comp === "scissors") {
        result = "Tie.";
      }
    }
  
    if (result === "You win.") {
      score.wins += 1;
    } else if (result === "You lose.") {
      score.loss += 1;
    } else if (result === "Tie.") {
      score.ties += 1;
    }
  
    localStorage.setItem("score", JSON.stringify(score));
  
    updateScoreElement();
  
    document.querySelector(".js-result").innerHTML = result;
    document.querySelector(
      ".js-moves"
    ).innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon"> - <img src="${comp}-emoji.png" class="move-icon"> Computer`;
  }
  
  function updateScoreElement() {
    document.querySelector(
      ".js-score"
    ).innerHTML = `Wins: ${score.wins} Loss: ${score.loss} Tie: ${score.ties}`;
  }
  function compMove() {
    let comp = "";
    const random = Math.random();
  
    if (random > 0 && random < 1 / 3) {
      comp = "rock";
    } else if (random > 1 / 3 && random < 2 / 3) {
      comp = "paper";
    } else if (random > 2 / 3 && random < 1) {
      comp = "scissors";
    }
    return comp;
  }
  