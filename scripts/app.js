import { gameLogic } from "./logic.js";

const rpsAPI = async () => {
    const promise = await fetch("https://scottsrpsls.azurewebsites.net/api/RockPaperScissors/GetRandomOption");
    return await promise.text();
}

let player1Wins = 0;
let player2Wins = 0;

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
            console.log(cpuChoice);
        }
    });
}
