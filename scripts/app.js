import { gameLogic, player1Wins, player2Wins, winner, color, image } from "./logic.js";

const rpsAPI = async () => {
    const promise = await fetch(
        "https://scottsrpsls.azurewebsites.net/api/RockPaperScissors/GetRandomOption"
    );
    return await promise.text();
};

let mode = 0;

// FOR PLAYER MODE: SINGLE OR MULTIPLAYER
if (location.pathname.includes("playerpage")) {
    let singlePlayer = document.getElementById("singlePlayer");
    let multiPlayer = document.getElementById("multiPlayer");

    let players = "";

    singlePlayer.addEventListener("click", () => {
        players = "single player";
        localStorage.setItem("playerMode", players);
        location.href = "./modepage.html";
    });

    multiPlayer.addEventListener("click", () => {
        players = "multiplayer";
        localStorage.setItem("playerMode", players);
        location.href = "./modepage.html";
    });
}

// FOR GAME MODE: BEST OF ONE, FIVE, AND SEVEN
if (location.pathname.includes("modepage")) {
    let best1 = document.getElementById("best1");
    let best5 = document.getElementById("best5");
    let best7 = document.getElementById("best7");

    let bestOf = "";
    best1.addEventListener("click", () => {
        bestOf = "one";
        localStorage.setItem("gameMode", bestOf);
        location.href = "./gamepage.html";
    });

    best5.addEventListener("click", () => {
        bestOf = "five";
        localStorage.setItem("gameMode", bestOf);
        location.href = "./gamepage.html";
    });

    best7.addEventListener("click", () => {
        bestOf = "seven";
        localStorage.setItem("gameMode", bestOf);
        location.href = "./gamepage.html";
    });
}

if (location.pathname.includes("gamepage")) {
    let gameTitle = document.getElementById("game-title");
    let options = document.getElementById("options");
    let outcome = document.getElementById("outcome");
    let imgResult = document.getElementById("imgResult");
    let next = document.getElementById("next");
    let rules = document.getElementById("rules");
    let winCount = document.getElementById("winCount");
    let rockBlue = document.getElementById("rockBlue");
    let paperBlue = document.getElementById("paperBlue");
    let scissorsBlue = document.getElementById("scissorsBlue");
    let lizardBlue = document.getElementById("lizardBlue");
    let spockBlue = document.getElementById("spockBlue");
    let imgsize = document.getElementById("imgsize");

    
    let rock = document.getElementById("rock");
    let paper = document.getElementById("paper");
    let scissors = document.getElementById("scissors");
    let lizard = document.getElementById("lizard");
    let spock = document.getElementById("spock");
    
    let player1Choice = "";
    let player1Turn = true;
    
    imgsize.classList.remove("img-block");
    // ROCK CLICK EVENT
    rock.addEventListener("click", async () => {
        
        // PLAYER VS CPU
        if (localStorage.getItem("playerMode") == "single player") {
            let cpuChoice = await rpsAPI();
            gameLogic("Rock", cpuChoice);
            gameTitle.classList.add("d-none");
            imgsize.classList.add("img-block");
            options.classList.add("d-none");
            rules.classList.add("d-none");
            winCount.classList.add("d-none");
            outcome.innerHTML = `You chose Rock. Computer chose ${cpuChoice}. <br> <span class=${color}>${winner}</span>`;
            imgResult.src = image;
            next.classList.remove("d-none");

            if (localStorage.getItem("gameMode") == "one" && player1Wins == 1 || (localStorage.getItem("gameMode") == "one" && player2Wins == 1)) {

                sessionStorage.setItem("Player1WinBoolean", player1Wins == 1 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });  
            }else if(localStorage.getItem("gameMode") == "one" && player1Wins !== 1 || (localStorage.getItem("gameMode") == "one" && player2Wins !== 1)){
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    rules.classList.remove("d-none");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/5</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }

            if ((localStorage.getItem("gameMode") == "five" && player1Wins == 3) || (localStorage.getItem("gameMode") == "five" && player2Wins == 3)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 3 ? true : false );
                next.addEventListener("click", () => {
                    location.href = "./endingpage.html";
                });
            } else if((localStorage.getItem("gameMode") == "five" && player1Wins !== 3) || (localStorage.getItem("gameMode") == "five" && player2Wins !== 3)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    rules.classList.remove("d-none");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/5</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }

            if ((localStorage.getItem("gameMode") == "seven" && player1Wins == 4) ||(localStorage.getItem("gameMode") == "seven" && player2Wins == 4)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 4 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            } else if((localStorage.getItem("gameMode") == "seven" && player1Wins !== 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins !== 4)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/7</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }
        } else {

            // PLAYER VS PLAYER
            if (player1Turn) {
                player1Choice = "Rock";
                gameTitle.innerHTML =
                    'PLAYER <span id="text-color" class="blue">TWO</span> CHOOSES:';
                rockBlue.classList.add("blueLine");
                paperBlue.classList.add("blueLine");
                scissorsBlue.classList.add("blueLine");
                lizardBlue.classList.add("blueLine");
                spockBlue.classList.add("blueLine");
                winCount.innerHTML = `P2 WINS: <span class="green"> ${player2Wins}/${mode}</span>`;
            } else {
                gameLogic(player1Choice, "Rock");
                gameTitle.classList.add("d-none");
                options.classList.add("d-none");
                rules.classList.add("d-none");
                winCount.classList.add("d-none");
                imgsize.classList.add("img-block");
                outcome.innerHTML = `Player One Chose ${player1Choice}. Player Two chose Rock. <br> <span class=${color}>${winner}</span>`;
                imgResult.src = image;
                next.classList.remove("d-none");
            }
            player1Turn = !player1Choice;
            
            if (localStorage.getItem("gameMode") == "one" && player1Wins == 1 || (localStorage.getItem("gameMode") == "one" && player2Wins == 1)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 1 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            }else if(localStorage.getItem("gameMode") == "one" && player1Wins !== 1 || (localStorage.getItem("gameMode") == "one" && player2Wins !== 1)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 5;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src= "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            }

            if ((localStorage.getItem("gameMode") == "five" && player1Wins == 3) || (localStorage.getItem("gameMode") == "five" && player2Wins == 3)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 3 ? true : false );
                next.addEventListener("click", () => {
                    location.href = "./endingpage.html";
                });
            } else if ((localStorage.getItem("gameMode") == "five" && player1Wins !== 3) || (localStorage.getItem("gameMode") == "five" && player2Wins !== 3)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 5;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src= "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            }

            if (
                (localStorage.getItem("gameMode") == "seven" && player1Wins == 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins == 4)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 4 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            } else if((localStorage.getItem("gameMode") == "seven" && player1Wins !== 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins !== 4)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 7;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            } 
                       
        }
    });

    // PAPER CLICK EVENT
    paper.addEventListener("click", async () => {
        if (localStorage.getItem("playerMode") == "single player") {
            let cpuChoice = await rpsAPI();
            gameLogic("Paper", cpuChoice);
            gameTitle.classList.add("d-none");
            options.classList.add("d-none");
            rules.classList.add("d-none");
            imgsize.classList.add("img-block");
            winCount.classList.add("d-none");
            outcome.innerHTML = `You chose Paper. Computer chose ${cpuChoice}. <br> <span class=${color}>${winner}</span>`;
            imgResult.src = image;
            next.classList.remove("d-none");

            if (localStorage.getItem("gameMode") == "one" && player1Wins == 1 || (localStorage.getItem("gameMode") == "one" && player2Wins == 1)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 1 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            }else if(localStorage.getItem("gameMode") == "one" && player1Wins !== 1 || (localStorage.getItem("gameMode") == "one" && player2Wins !== 1)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/5</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }

            if ((localStorage.getItem("gameMode") == "five" && player1Wins == 3) || (localStorage.getItem("gameMode") == "five" && player2Wins == 3)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 3 ? true : false );
                next.addEventListener("click", () => {
                    location.href = "./endingpage.html";
                });
            } else if((localStorage.getItem("gameMode") == "five" && player1Wins !== 3) || (localStorage.getItem("gameMode") == "five" && player2Wins !== 3)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/5</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }

            if ((localStorage.getItem("gameMode") == "seven" && player1Wins == 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins == 4)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 4 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            } else if((localStorage.getItem("gameMode") == "seven" && player1Wins !== 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins !== 4)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/7</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }
        } else {
            if (player1Turn) {
                player1Choice = "Paper";
                gameTitle.innerHTML =
                    'PLAYER <span id="text-color" class="blue">TWO</span> CHOOSES:';
                rockBlue.classList.add("blueLine");
                paperBlue.classList.add("blueLine");
                scissorsBlue.classList.add("blueLine");
                lizardBlue.classList.add("blueLine");
                spockBlue.classList.add("blueLine");
                winCount.innerHTML = `P2 WINS: <span class="green"> ${player2Wins}/${mode}</span>`;

            } else {
                gameLogic(player1Choice, "Paper");
                gameTitle.classList.add("d-none");
                options.classList.add("d-none");
                rules.classList.add("d-none");
                imgsize.classList.add("img-block");
                winCount.classList.add("d-none");
                outcome.innerHTML = `Player One chose ${player1Choice}. Player Two chose Paper. <br> <span class=${color}>${winner}</span>`;
                imgResult.src = image;
                next.classList.remove("d-none");
                
            }
            player1Turn = !player1Choice;
            
            if (localStorage.getItem("gameMode") == "one" && player1Wins == 1 || (localStorage.getItem("gameMode") == "one" && player2Wins == 1)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 1 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            }else if(localStorage.getItem("gameMode") == "one" && player1Wins !== 1 || (localStorage.getItem("gameMode") == "one" && player2Wins !== 1)){
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 5;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            }

            if ((localStorage.getItem("gameMode") == "five" && player1Wins == 3) || (localStorage.getItem("gameMode") == "five" && player2Wins == 3) ) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 3 ? true : false );
                next.addEventListener("click", () => {
                    location.href = "./endingpage.html";
                });
            } else if((localStorage.getItem("gameMode") == "five" && player1Wins !== 3) || (localStorage.getItem("gameMode") == "five" && player2Wins !== 3)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 5;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            }

            if ((localStorage.getItem("gameMode") == "seven" && player1Wins == 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins == 4)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 4 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            } else if((localStorage.getItem("gameMode") == "seven" && player1Wins !== 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins !== 4)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 7;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src= "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            }
        }
    });

    // SCISSORS CLICK EVENT
    scissors.addEventListener("click", async () => {
        if (localStorage.getItem("playerMode") == "single player") {
            let cpuChoice = await rpsAPI();
            gameLogic("Scissors", cpuChoice);
            gameTitle.classList.add("d-none");
            options.classList.add("d-none");
            imgsize.classList.add("img-block");
            rules.classList.add("d-none");
            winCount.classList.add("d-none");
            outcome.innerHTML = `You chose Scissors. Computer chose ${cpuChoice}. <br> <span class=${color}>${winner}</span>`;
            imgResult.src = image;
            next.classList.remove("d-none");

            if (localStorage.getItem("gameMode") == "one" && player1Wins == 1 || (localStorage.getItem("gameMode") == "one" && player2Wins == 1)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 1 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            }else if (localStorage.getItem("gameMode") == "one" && player1Wins !== 1 || (localStorage.getItem("gameMode") == "one" && player2Wins !== 1)){
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/5</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }

            if ((localStorage.getItem("gameMode") == "five" && player1Wins == 3) || (localStorage.getItem("gameMode") == "five" && player2Wins == 3)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 3 ? true : false );
                next.addEventListener("click", () => {
                    location.href = "./endingpage.html";
                });
            } else if((localStorage.getItem("gameMode") == "five" && player1Wins !== 3) || (localStorage.getItem("gameMode") == "five" && player2Wins !== 3)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/5</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }

            if ((localStorage.getItem("gameMode") == "seven" && player1Wins == 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins == 4)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 4 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            } else if((localStorage.getItem("gameMode") == "seven" && player1Wins !== 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins !== 4)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/7</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }
        } else {
            // PLAYER VS PLAYER
            if (player1Turn) {
                player1Choice = "Scissors";
                gameTitle.innerHTML =
                    'PLAYER <span id="text-color" class="blue">TWO</span> CHOOSES:';
                rockBlue.classList.add("blueLine");
                paperBlue.classList.add("blueLine");
                scissorsBlue.classList.add("blueLine");
                lizardBlue.classList.add("blueLine");
                spockBlue.classList.add("blueLine");
                winCount.innerHTML = `P2 WINS: <span class="green"> ${player2Wins}/${mode}</span>`;
            } else {
                gameLogic(player1Choice, "Scissors");
                gameTitle.classList.add("d-none");
                options.classList.add("d-none");
                rules.classList.add("d-none");
                imgsize.classList.add("img-block");
                winCount.classList.add("d-none");
                outcome.innerHTML = `Player One chose ${player1Choice}. Player Two chose Scissors. <br> <span class=${color}>${winner}</span>`;
                imgResult.src = image;
                next.classList.remove("d-none");
            }
            player1Turn = !player1Choice;
            
            if (localStorage.getItem("gameMode") == "one" && player1Wins == 1 || (localStorage.getItem("gameMode") == "one" && player2Wins == 1)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 1 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            } else if(localStorage.getItem("gameMode") == "one" && player1Wins !== 1 || (localStorage.getItem("gameMode") == "one" && player2Wins !== 1)){
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 5;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            }

            if ((localStorage.getItem("gameMode") == "five" && player1Wins == 3) || (localStorage.getItem("gameMode") == "five" && player2Wins == 3)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 3 ? true : false );
                next.addEventListener("click", () => {
                    location.href = "./endingpage.html";
                });
            } else if((localStorage.getItem("gameMode") == "five" && player1Wins !== 3) || (localStorage.getItem("gameMode") == "five" && player2Wins !== 3)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 5;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            }

            if ((localStorage.getItem("gameMode") == "seven" && player1Wins == 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins == 4)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 4 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            } else if((localStorage.getItem("gameMode") == "seven" && player1Wins !== 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins !== 4)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 7;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            }
        }
    });

    // LIZARD CLICK EVENT
    lizard.addEventListener("click", async () => {
        if (localStorage.getItem("playerMode") == "single player") {
            let cpuChoice = await rpsAPI();
            gameLogic("Lizard", cpuChoice);
            gameTitle.classList.add("d-none");
            options.classList.add("d-none");
            rules.classList.add("d-none");
            imgsize.classList.add("img-block");
            winCount.classList.add("d-none");
            outcome.innerHTML = `You chose Lizard. Computer chose ${cpuChoice}. <br> <span class=${color}>${winner}</span>`;
            imgResult.src = image;
            next.classList.remove("d-none");

            if (localStorage.getItem("gameMode") == "one" && player1Wins == 1 || (localStorage.getItem("gameMode") == "one" && player2Wins == 1)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 1 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            }else if(localStorage.getItem("gameMode") == "one" && player1Wins !== 1 || (localStorage.getItem("gameMode") == "one" && player2Wins !== 1)){
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/5</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }

            if ((localStorage.getItem("gameMode") == "five" && player1Wins == 3) || (localStorage.getItem("gameMode") == "five" && player2Wins == 3) ) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 3 ? true : false );
                next.addEventListener("click", () => {
                    location.href = "./endingpage.html";
                });
            } else if((localStorage.getItem("gameMode") == "five" && player1Wins !== 3) || (localStorage.getItem("gameMode") == "five" && player2Wins !== 3)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/5</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }

            if ((localStorage.getItem("gameMode") == "seven" && player1Wins == 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins == 4)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 4 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            } else if((localStorage.getItem("gameMode") == "seven" && player1Wins !== 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins !== 4)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/7</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }
        }else {
            // PLAYER VS PLAYER
            if (player1Turn) {
                player1Choice = "Lizard";
                gameTitle.innerHTML =
                    'PLAYER <span id="text-color" class="blue">TWO</span> CHOOSES:';
                rockBlue.classList.add("blueLine");
                paperBlue.classList.add("blueLine");
                scissorsBlue.classList.add("blueLine");
                lizardBlue.classList.add("blueLine");
                spockBlue.classList.add("blueLine");
                winCount.innerHTML = `P2 WINS: <span class="green"> ${player2Wins}/${mode}</span>`;
            } else {
                gameLogic(player1Choice, "Lizard");
                gameTitle.classList.add("d-none");
                options.classList.add("d-none");
                rules.classList.add("d-none");
                imgsize.classList.add("img-block");
                winCount.classList.add("d-none");
                outcome.innerHTML = `Player One Chose ${player1Choice}. Player Two chose Lizard. <br> <span class=${color}>${winner}</span>`;
                imgResult.src = image;
                next.classList.remove("d-none");
            }
            player1Turn = !player1Choice;
            
            if (localStorage.getItem("gameMode") == "one" && player1Wins == 1 || (localStorage.getItem("gameMode") == "one" && player2Wins == 1)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 1 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            } else if (localStorage.getItem("gameMode") == "one" && player1Wins !== 1 || (localStorage.getItem("gameMode") == "one" && player2Wins !== 1)){
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 5;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            }

            if ((localStorage.getItem("gameMode") == "five" && player1Wins == 3) || (localStorage.getItem("gameMode") == "five" && player2Wins == 3)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 3 ? true : false );
                next.addEventListener("click", () => {
                    location.href = "./endingpage.html";
                });
            } else if((localStorage.getItem("gameMode") == "five" && player1Wins !== 3) || (localStorage.getItem("gameMode") == "five" && player2Wins !== 3)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 5;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            }

            if ((localStorage.getItem("gameMode") == "seven" && player1Wins == 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins == 4)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 4 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            } else if((localStorage.getItem("gameMode") == "seven" && player1Wins !== 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins !== 4)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 7;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            }
        }
    });

    // SPOCK CLICK EVENT
    spock.addEventListener("click", async () => {
        if (localStorage.getItem("playerMode") == "single player") {
            let cpuChoice = await rpsAPI();
            gameLogic("Spock", cpuChoice);
            gameTitle.classList.add("d-none");
            options.classList.add("d-none");
            rules.classList.add("d-none");
            imgsize.classList.add("img-block");
            winCount.classList.add("d-none");
            outcome.innerHTML = `You chose Spock. Computer chose ${cpuChoice}. <br> <span class=${color}>${winner}</span>`;
            imgResult.src = image;
            next.classList.remove("d-none");

            if (localStorage.getItem("gameMode") == "one" && player1Wins == 1 || (localStorage.getItem("gameMode") == "one" && player2Wins == 1)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 1 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            }else if (localStorage.getItem("gameMode") == "one" && player1Wins !== 1 || (localStorage.getItem("gameMode") == "one" && player2Wins !== 1)){
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/5</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }

            if ((localStorage.getItem("gameMode") == "five" && player1Wins == 3) || (localStorage.getItem("gameMode") == "five" && player2Wins == 3)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 3 ? true : false );
                next.addEventListener("click", () => {
                    location.href = "./endingpage.html";
                });
            } else if((localStorage.getItem("gameMode") == "five" && player1Wins !== 3) || (localStorage.getItem("gameMode") == "five" && player2Wins !== 3)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/5</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }

            if ((localStorage.getItem("gameMode") == "seven" && player1Wins == 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins == 4)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 4 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            } else if((localStorage.getItem("gameMode") == "seven" && player1Wins !== 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins !== 4)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/7</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                });
            }
        }else {
            // PLAYER VS PLAYER
            if (player1Turn) {
                player1Choice = "Spock";
                gameTitle.innerHTML =
                    'PLAYER <span id="text-color" class="blue">TWO</span> CHOOSES:';
                rockBlue.classList.add("blueLine");
                paperBlue.classList.add("blueLine");
                scissorsBlue.classList.add("blueLine");
                lizardBlue.classList.add("blueLine");
                spockBlue.classList.add("blueLine");
                winCount.innerHTML = `P2 WINS: <span class="green"> ${player2Wins}/${mode}</span>`;
            } else {
                gameLogic(player1Choice, "Spock");
                gameTitle.classList.add("d-none");
                options.classList.add("d-none");
                rules.classList.add("d-none");
                imgsize.classList.add("img-block");
                winCount.classList.add("d-none");
                outcome.innerHTML = `Player One Chose ${player1Choice}. Player Two chose Spock. <br> <span class=${color}>${winner}</span>`;
                imgResult.src = image;
                next.classList.remove("d-none");
            }
            player1Turn = !player1Choice;
            
            if (localStorage.getItem("gameMode") == "one" && player1Wins == 1 || (localStorage.getItem("gameMode") == "one" && player2Wins == 1)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 1 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            }else if(localStorage.getItem("gameMode") == "one" && player1Wins !== 1 || (localStorage.getItem("gameMode") == "one" && player2Wins !== 1)){
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 5;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            }

            if ((localStorage.getItem("gameMode") == "five" && player1Wins == 3) || (localStorage.getItem("gameMode") == "five" && player2Wins == 3)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 3 ? true : false );
                next.addEventListener("click", () => {
                    location.href = "./endingpage.html";
                });
            } else if((localStorage.getItem("gameMode") == "five" && player1Wins !== 3) || (localStorage.getItem("gameMode") == "five" && player2Wins !== 3)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 5;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            }

            if ( (localStorage.getItem("gameMode") == "seven" && player1Wins == 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins == 4)) {
                sessionStorage.setItem("Player1WinBoolean", player1Wins == 4 ? true : false );
                next.addEventListener("click", () => {
                    location.replace("./endingpage.html");
                });
            } else if((localStorage.getItem("gameMode") == "seven" && player1Wins !== 4) || (localStorage.getItem("gameMode") == "seven" && player2Wins !== 4)) {
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    imgsize.classList.remove("img-block");
                    mode = 7;
                    winCount.classList.remove("d-none");
                    winCount.innerHTML = `P1 WINS: <span class="green"> ${player1Wins}/${mode}</span>`;
                    outcome.innerHTML = "";
                    imgResult.src = "";
                    next.classList.add("d-none");
                    player1Turn = true;
                    gameTitle.innerHTML ='PLAYER <span id="text-color" class="red">ONE</span> CHOOSES:';
                    rockBlue.classList.remove("blueLine");
                    paperBlue.classList.remove("blueLine");
                    scissorsBlue.classList.remove("blueLine");
                    lizardBlue.classList.remove("blueLine");
                    spockBlue.classList.remove("blueLine");
                });
            }
        }
    });
}

// ENDING PAGE 
if (location.pathname.includes("endingpage")) {
    let ending = document.getElementById("ending");
    let result = document.getElementById("result");
    let mainMenuBtn = document.getElementById("mainMenuBtn");
    mainMenuBtn.addEventListener("click", ()=> {
        localStorage.clear();
        sessionStorage.clear();
    })

    // SINGLE PLAYER OUT COMES
    if(localStorage.getItem("playerMode") == "single player" ){

        // BEST OUT OF RESULTS
        if(localStorage.getItem("gameMode") == "one"){
            if(sessionStorage.getItem("Player1WinBoolean") == "true"){
                ending.classList.add("p1winBG");
                result.innerHTML = `YOU WON! <br><span class="score-text red">YOU WON ONE OUT OF ONE TIME!</span>`;
            }else{
                ending.classList.add("p2winBG");
                result.innerHTML = `UNFORTUNATELY, YOU LOST! <br><span class="score-text blue">COMPUTER WON ONE OUT OF ONE TIME!</span>`;
            }
        }else if(localStorage.getItem("gameMode") == "five"){
            if(sessionStorage.getItem("Player1WinBoolean") == "true"){
                ending.classList.add("p1winBG");
                result.innerHTML = `YOU WON! <br><span class="score-text red">YOU WON THREE OUT OF FIVE TIMES!</span>`;
            }else{
                ending.classList.add("p2winBG");
                result.innerHTML = `UNFORTUNATELY, YOU LOST! <br><span class="score-text blue">COMPUTER WON THREE OUT OF FIVE TIMES!</span>`;
            }
        }else{
            if(sessionStorage.getItem("Player1WinBoolean") == "true"){
                ending.classList.add("p1winBG");
                result.innerHTML = `YOU WON! <br><span class="score-text red">YOU WON FOUR OUT OF SEVEN TIMES!</span>`;
            }else{
                ending.classList.add("p2winBG");
                result.innerHTML = `UNFORTUNATELY, YOU LOST! <br><span class="score-text blue">COMPUTER WON FOUR OUT OF SEVEN TIMES!</span>`;
            }
        }
    }else {

        // PLAYER VS PLAYER OUTCOMES
        if(localStorage.getItem("gameMode") == "one"){
            if(sessionStorage.getItem("Player1WinBoolean") == "true"){
                ending.classList.add("p1winBG");
                result.innerHTML = `PLAYER ONE WINS! <br><span class="score-text red">PLAYER ONE WON ONE OUT OF ONE TIME!</span>`;
            }else{
                ending.classList.add("p2winBG");
                result.innerHTML = `PLAYER TWO WINS! <br><span class="score-text blue">PLAYER TWO WON ONE OUT OF ONE TIME!</span>`;
            }
        }else if(localStorage.getItem("gameMode") == "five"){
            if(sessionStorage.getItem("Player1WinBoolean") == "true"){
                ending.classList.add("p1winBG");
                result.innerHTML = `PLAYER ONE WINS!<br><span class="score-text red">PLAYER ONE WON THREE OUT OF FIVE TIMES!</span>`;
            }else{
                ending.classList.add("p2winBG");
                result.innerHTML = `PLAYER TWO WINS! <br><span class="score-text blue">PLAYER TWO WON THREE OUT OF FIVE TIMES!</span>`;
            }
        }else{
            if(sessionStorage.getItem("Player1WinBoolean") == "true"){
                ending.classList.add("p1winBG");
                result.innerHTML = `PLAYER ONE WINS! <br><span class="score-text red">PLAYER ONE WON FOUR OUT OF SEVEN TIMES!</span>`;
            }else{
                ending.classList.add("p2winBG");
                result.innerHTML = `PLAYER TWO WINS! <br><span class="score-text blue">PLAYER TWO WON FOUR OUT OF SEVEN TIMES!</span>`;
            }
        }
    }
}
