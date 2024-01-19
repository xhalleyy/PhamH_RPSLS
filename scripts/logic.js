
let player1Wins = 0;
let player2Wins = 0;
let winner = "";
let color = "";

const gameLogic = (answer1, answer2) => {
    switch (answer1) {
        case "Rock":
            switch (answer2) {
                case "Rock":
                    winner = "You guys Tied!";
                    color = "blackLine";
                    break;
                case "Scissors":
                    winner = "Rock crushes Scissors!";
                    color = "redLine";
                    player1Wins++;
                    break;
                case "Lizard":
                    winner = "Rock crushes Lizard!";
                    color = "redLine";
                    player1Wins++;
                    break;
                case "Paper":
                    winner = "Paper covers Rock!";
                    color = "blueLine";
                    player2Wins++;
                    break;
                default:
                    winner = "Spock vaporizes Rock!";
                    color = "blueLine";
                    player2Wins++;
            }
            break;
        case "Paper":
            switch (answer2) {
                case "Paper":
                    winner = "You guys Tied!"
                    color = "blackLine";
                    break;
                case "Rock":
                    winner = "Paper covers Rock!";
                    color = "redLine";
                    player1Wins++;
                    break;
                case "Scissors":
                    winner = "Scissors cut Paper!";
                    color = "blueLine";
                    player2Wins++;
                    break;
                case "Lizard":
                    winner = "Lizard eats Paper!";
                    color = "blueLine";
                    player2Wins++;
                    break;
                default:
                    winner = "Paper disproves Spock!";
                    color = "redLine";
                    player1Wins++;
            }
            break;
        case "Scissors":
            switch (answer2) {
                case "Scissors":
                    winner = "You guys tied!";
                    color = "blackLine";
                    break;
                case "Rock":
                    winner = "Rock crushes Scissors!";
                    color = "blueLine";
                    player2Wins++;
                    break;
                case "Paper":
                    winner = "Scissors cut Paper!";
                    color = "redLine";
                    player1Wins++;
                    break;
                case "Lizard":
                    winner = "Scissors decapitate Lizard!";
                    color = "redLine";
                    player1Wins++;
                    break;
                default:
                    winner = "Spock smashes Scissors!";
                    color = "blueLine";
                    player2Wins++;
            }
            break;
        case "Lizard":
            switch (answer2) {
                case "Lizard":
                    winner = "You guys tied!";
                    color = "blackLine";
                    break;
                case "Rock":
                    winner = "Rock crushes Lizard!";
                    color = "blueLine";
                    player2Wins++;
                    break;
                case "Paper":
                    winner = "Lizard eats Paper!";
                    color = "redLine";
                    player1Wins++;
                    break;
                case "Scissors":
                    winner = "Scissors decapitate Lizard!";
                    color = "blueLine";
                    player2Wins++;
                    break;
                default:
                    winner = "Lizard poisons Spock!";
                    color = "redLine";
                    player1Wins++;
            }
            break;
        default:
            switch (answer2) {
                case "Rock":
                    winner = "Spock vaporizes Rock!";
                    color = "redLine";
                    player1Wins++;
                    break;
                case "Paper":
                    winner = "Paper disproves Spock!";
                    color = "blueLine";
                    player2Wins++;
                    break;
                case "Scissors":
                    winner = "Spock smashes Scissors!";
                    color = "redLine";
                    player1Wins++;
                    break;
                case "Lizard":
                    winner = "Lizard poisons Spock!";
                    color = "blueLine";
                    player2Wins++;
                    break;
                default:
                    winner = "You guys Tied!";
                    color = "blackLine";
            }
    }
}

export { gameLogic, player1Wins, player2Wins, winner, color }