import { gameLogic, player1Wins, player2Wins, winner, color } from "./logic.js";

const rpsAPI = async () => {
    const promise = await fetch("https://scottsrpsls.azurewebsites.net/api/RockPaperScissors/GetRandomOption");
    return await promise.text();
}

// FOR PLAYER MODE: SINGLE OR MULTIPLAYER
if (location.pathname.includes("playerpage")) {
    let singlePlayer = document.getElementById("singlePlayer");
    let multiPlayer = document.getElementById("multiPlayer");

    let players = "";

    singlePlayer.addEventListener("click", () => {
        players = "single player";
        localStorage.setItem("playerMode", players);
        location.href = './modepage.html';
    });

    multiPlayer.addEventListener("click", () => {
        players = "multiplayer";
        localStorage.setItem("playerMode", players);
        location.href = './modepage.html';
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
        location.href='./gamepage.html';
    });

    best5.addEventListener("click", () => {
        bestOf = "five";
        localStorage.setItem("gameMode", bestOf);
        location.href='./gamepage.html';
    });

    best7.addEventListener("click", () => {
        bestOf = "seven";
        localStorage.setItem("gameMode", bestOf);
        location.href='./gamepage.html';
    });
}

if(location.pathname.includes("gamepage")) {
    let gameTitle = document.getElementById("game-title");
    let textColor = document.getElementById("text-color");
    let options = document.getElementById("options");
    let outcome = document.getElementById("outcome");
    let next = document.getElementById("next");
    let whatWins = document.getElementById("whatWins");
    let rules = document.getElementById("rules");

    let rock = document.getElementById("rock");
    let paper = document.getElementById("paper");
    let scissors = document.getElementById("scissors");
    let lizard = document.getElementById("lizard");
    let spock = document.getElementById("spock");

    // ROCK CLICK EVENT
    rock.addEventListener("click", async () => {
        // PLAYER VS CPU
        if(localStorage.getItem("playerMode") == "single player"){
            let cpuChoice = await rpsAPI();
            gameLogic("Rock", cpuChoice);
            gameTitle.classList.add("d-none");
            options.classList.add("d-none");
            rules.classList.add("d-none");
            outcome.innerHTML = `You chose Rock. Computer chose ${cpuChoice}. <br> <span class=${color}>${winner}</span>`;
            next.classList.remove("d-none");
            // BEST OF 1
            if(localStorage.getItem("gameMode") == "one") {
                next.addEventListener("click", () => {
                    location.replace('./endingpage.html');
                });
            }
            
            if(localStorage.getItem("gameMode") == "five" && player1Wins == 3 || player2Wins == 3) {
                next.addEventListener("click", () => {
                    location.href='./endingpage.html';
                });
            }else{
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    outcome.innerHTML = "";
                    next.classList.add("d-none");
                });
            }

            if(localStorage.getItem("gameMode") == "seven" && player1Wins == 4 || player2Wins == 4) {
                next.addEventListener("click", () => {
                    location.replace('./endingpage.html');
                });
            }else{
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    outcome.innerHTML = "";
                    next.classList.add("d-none");
                });
            }
        }
    });

    // PAPER CLICK EVENT
    paper.addEventListener("click", async ()=> {
        if(localStorage.getItem("playerMode") == "single player"){
            let cpuChoice = await rpsAPI();
            await gameLogic("Paper", cpuChoice);
            gameTitle.classList.add("d-none");
            options.classList.add("d-none");
            rules.classList.add("d-none");
            outcome.innerHTML = `You chose Paper. Computer chose ${cpuChoice}. <br> <span class=${color}>${winner}</span>`;
            next.classList.remove("d-none");
            // BEST OF 1
            if(localStorage.getItem("gameMode") == "one") {
                next.addEventListener("click", () => {
                    location.replace('./endingpage.html');
                });
            }
            
            if(localStorage.getItem("gameMode") == "five" && player1Wins == 3 || player2Wins == 3) {
                next.addEventListener("click", () => {
                    location.href='./endingpage.html';
                });
            }else{
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    outcome.innerHTML = "";
                    next.classList.add("d-none");
                });
            }

            if(localStorage.getItem("gameMode") == "seven" && player1Wins == 4 || player2Wins == 4) {
                next.addEventListener("click", () => {
                    location.replace('./endingpage.html');
                });
            }else{
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    outcome.innerHTML = "";
                    next.classList.add("d-none");
                });
            }
        }
    });

    // SCISSORS CLICK EVENT
    scissors.addEventListener("click", async ()=> {
        if(localStorage.getItem("playerMode") == "single player"){
            let cpuChoice = await rpsAPI();
            gameLogic("Scissors", cpuChoice);
            gameTitle.classList.add("d-none");
            options.classList.add("d-none");
            rules.classList.add("d-none");
            outcome.innerHTML = `You chose Scissors. Computer chose ${cpuChoice}. <br> <span class=${color}>${winner}</span>`;
            next.classList.remove("d-none");
            // BEST OF 1
            if(localStorage.getItem("gameMode") == "one") {
                next.addEventListener("click", () => {
                    location.replace('./endingpage.html');
                });
            }
            
            if(localStorage.getItem("gameMode") == "five" && player1Wins == 3 || player2Wins == 3) {
                next.addEventListener("click", () => {
                    location.href='./endingpage.html';
                });
            }else{
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    outcome.innerHTML = "";
                    next.classList.add("d-none");
                });
            }

            if(localStorage.getItem("gameMode") == "seven" && player1Wins == 4 || player2Wins == 4) {
                next.addEventListener("click", () => {
                    location.replace('./endingpage.html');
                });
            }else{
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    outcome.innerHTML = "";
                    next.classList.add("d-none");
                });
            }
        }
    });

    // LIZARD CLICK EVENT
    lizard.addEventListener("click", async ()=> {
        if(localStorage.getItem("playerMode") == "single player"){
            let cpuChoice = await rpsAPI();
            gameLogic("Lizard", cpuChoice);
            gameTitle.classList.add("d-none");
            options.classList.add("d-none");
            rules.classList.add("d-none");
            outcome.innerHTML = `You chose Lizard. Computer chose ${cpuChoice}. <br> <span class=${color}>${winner}</span>`;
            next.classList.remove("d-none");
            // BEST OF 1
            if(localStorage.getItem("gameMode") == "one") {
                next.addEventListener("click", () => {
                    location.replace('./endingpage.html');
                });
            }
            
            if(localStorage.getItem("gameMode") == "five" && player1Wins == 3 || player2Wins == 3) {
                next.addEventListener("click", () => {
                    location.href='./endingpage.html';
                });
            }else{
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    outcome.innerHTML = "";
                    next.classList.add("d-none");
                });
            }

            if(localStorage.getItem("gameMode") == "seven" && player1Wins == 4 || player2Wins == 4) {
                next.addEventListener("click", () => {
                    location.replace('./endingpage.html');
                });
            }else{
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    outcome.innerHTML = "";
                    next.classList.add("d-none");
                });
            }
        }
    });

    // SPOCK CLICK EVENT
    spock.addEventListener("click", async ()=> {
        if(localStorage.getItem("playerMode") == "single player"){
            let cpuChoice = await rpsAPI();
            gameLogic("Spock", cpuChoice);
            gameTitle.classList.add("d-none");
            options.classList.add("d-none");
            rules.classList.add("d-none");
            outcome.innerHTML = `You chose Spock. Computer chose ${cpuChoice}. <br> <span class=${color}>${winner}</span>`;
            next.classList.remove("d-none");
            // BEST OF 1
            if(localStorage.getItem("gameMode") == "one") {
                next.addEventListener("click", () => {
                    location.replace('./endingpage.html');
                });
            }
            
            if(localStorage.getItem("gameMode") == "five" && player1Wins == 3 || player2Wins == 3) {
                next.addEventListener("click", () => {
                    location.href='./endingpage.html';
                });
            }else{
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    outcome.innerHTML = "";
                    next.classList.add("d-none");
                });
            }

            if(localStorage.getItem("gameMode") == "seven" && player1Wins == 4 || player2Wins == 4) {
                next.addEventListener("click", () => {
                    location.replace('./endingpage.html');
                });
            }else{
                next.addEventListener("click", () => {
                    gameTitle.classList.remove("d-none");
                    options.classList.remove("d-none");
                    rules.classList.remove("d-none");
                    outcome.innerHTML = "";
                    next.classList.add("d-none");
                });
            }
        }
    })

}
