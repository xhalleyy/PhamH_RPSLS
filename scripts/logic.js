
let player1Wins = 0;
let player2Wins = 0;
let winner = "";
let color = "";
let image = "";

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
                    image = "../assets/rockwin2.png";
                    break;
                case "Lizard":
                    winner = "Rock crushes Lizard!";
                    color = "redLine";
                    player1Wins++;
                    image = "../assets/rockwin1.png";
                    break;
                case "Paper":
                    winner = "Paper covers Rock!";
                    color = "blueLine";
                    image = "../assets/paperwin1.png";
                    player2Wins++;
                    break;
                default:
                    winner = "Spock vaporizes Rock!";
                    color = "blueLine";
                    image = "../assets/spockwin2.png";
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
                    image = "../assets/paperwin1.png";
                    player1Wins++;
                    break;
                case "Scissors":
                    winner = "Scissors cut Paper!";
                    color = "blueLine";
                    player2Wins++;
                    image = "../assets/scissorswin1.png";
                    break;
                case "Lizard":
                    winner = "Lizard eats Paper!";
                    color = "blueLine";
                    image = "../assets/lizardwin2.png";
                    player2Wins++;
                    break;
                default:
                    winner = "Paper disproves Spock!";
                    color = "redLine";
                    image = "../assets/paperwin2.png";
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
                    image = "../assets/rockwin2.png";
                    break;
                case "Paper":
                    winner = "Scissors cut Paper!";
                    color = "redLine";
                    player1Wins++;
                    image = "../assets/scissorswin1.png";
                    break;
                case "Lizard":
                    winner = "Scissors decapitate Lizard!";
                    color = "redLine";
                    player1Wins++;
                    image = "../assets/scissorswin2.png";
                    break;
                default:
                    winner = "Spock smashes Scissors!";
                    color = "blueLine";
                    image = "../assets/spockwin1.png";
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
                    image = "../assets/rockwin1.png";
                    break;
                case "Paper":
                    winner = "Lizard eats Paper!";
                    color = "redLine";
                    image = "../assets/lizardwin2.png";
                    player1Wins++;
                    break;
                case "Scissors":
                    winner = "Scissors decapitate Lizard!";
                    color = "blueLine";
                    player2Wins++;
                    image = "../assets/scissorswin2.png";
                    break;
                default:
                    winner = "Lizard poisons Spock!";
                    color = "redLine";
                    image = "../assets/lizardwin1.png";
                    player1Wins++;
            }
            break;
        default:
            switch (answer2) {
                case "Rock":
                    winner = "Spock vaporizes Rock!";
                    color = "redLine";
                    image = "../assets/spockwin2.png";
                    player1Wins++;
                    break;
                case "Paper":
                    winner = "Paper disproves Spock!";
                    color = "blueLine";
                    image = "../assets/paperwin2.png";
                    player2Wins++;
                    break;
                case "Scissors":
                    winner = "Spock smashes Scissors!";
                    color = "redLine";
                    image = "../assets/spockwin1.png";
                    player1Wins++;
                    break;
                case "Lizard":
                    winner = "Lizard poisons Spock!";
                    color = "blueLine";
                    image = "../assets/lizardwin1.png";
                    player2Wins++;
                    break;
                default:
                    winner = "You guys Tied!";
                    color = "blackLine";
            }
    }
}

export { gameLogic, player1Wins, player2Wins, winner, color, image }