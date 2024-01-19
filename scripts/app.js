const rpsAPI = async () => {
    const promise = await fetch("https://jessierpslsapi.azurewebsites.net/api/RPSLS/RandomCpuChoice");
    const data = await promise.text;
}

// FOR PLAYER MODE: SINGLE OR MULTIPLAYER
if (location.pathname.includes("playerpage")) {
    let singlePlayer = document.getElementById("singlePlayer");
    let multiPlayer = document.getElementById("multiPlayer");

    let players = "";
    if (localStorage.getItem("playerMode")) {
        players = JSON.parse(localStorage.getItem("playerMode"));
    }

    singlePlayer.addEventListener("click", () => {
        players = "single player";
        localStorage.setItem("playerMode", JSON.stringify(players));
        location.href = './modepage.html';
    });

    multiPlayer.addEventListener("click", () => {
        players = "multiplayer";
        localStorage.setItem("playerMode", JSON.stringify(players));
        location.href = './modepage.html';
    });
}

// FOR GAME MODE: BEST OF ONE, FIVE, AND SEVEN
if (location.pathname.includes("modepage")) {
    let best1 = document.getElementById("best1");
    let best5 = document.getElementById("best5");
    let best7 = document.getElementById("best7");

    let bestOf = "";
    if (localStorage.getItem("gameMode")) {
        bestOf = JSON.parse(localStorage.getItem("gameMode"));
    }

    best1.addEventListener("click", () => {
        bestOf = "one";
        localStorage.setItem("gameMode", JSON.stringify(bestOf));
    });

    best5.addEventListener("click", () => {
        bestOf = "five";
        localStorage.setItem("gameMode", JSON.stringify(bestOf));
    });

    best7.addEventListener("click", () => {
        bestOf = "seven";
        localStorage.setItem("gameMode", JSON.stringify(bestOf));
    });
}

// GAME LOGIC
if(location.pathname.includes("gamepage")) {
    let rock = document.getElementById("rock");
    let paper = document.getElementById("paper");
    let scissors = document.getElementById("scissors");
    let lizard = document.getElementById("lizard");
    let spock = document.getElementById("spock");

    // PLAYER VS CPU !!!!
    if(localStorage.getItem("playerMode") == "single player") {
        
        // BEST OFS VS CPU
        if(localStorage.getItem("gameMode") == "one") {

        }else if(localStorage.getItem("gameMode") == "five") {

        }else {

        }
    }else{
        // PLAYER VS PLAYER
        // BEST OFS 
        if(localStorage.getItem("gameMode") == "one") {

        }else if(localStorage.getItem("gameMode") == "five") {

        }else {

        }
    }
}
