// Board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// Players
let playerWidth = 10;
let playerHeight = 50;
playerVelocityY = 0;

let player1 = {
    x : 10,
    y : boardHeight/2,
    width : playerWidth,
    height : playerHeight,
    velocityY : playerVelocityY
}

let player2 = {
    x : boardWidth - playerWidth - 10,
    y : boardHeight/2,
    width : playerWidth,
    height : playerHeight,
    velocityY : playerVelocityY
}

// Ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width : ballWidth,
    height : ballHeight,
    velocityX : 1,
    velocityY : 2
}

let player1Score = 0;
let player2Score = 0;

window.onload = function(){
    board= document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");  // Used for Drawing on the Board

    // Draw Initial Player1
    context.fillStyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer);
}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // Player 1
    context.fillStyle = "skyblue";
    // player1.y += player1.velocityY;
    let nextPlayer1Y = player1.y + player1.velocityY;
    if(!outOfBounds(nextPlayer1Y)){
        player1.y += player1.velocityY;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    // Player 2
    // player2.y += player2.velocityY;
    let nextPlayer2Y = player2.y + player2.velocityY;
    if(!outOfBounds(nextPlayer2Y)){
        player2.y += player2.velocityY;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    // Ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // If Ball Touches Top or Bottom of the Canvas
    if(ball.y <= 0 || (ball.y + ball.height >= boardHeight)){
        ball.velocityY *= -1;  // Reverse Direction
    }

    // Bounce the Ball Back
    if(detectCollision(ball, player1)){
        if(ball.x <= player1.x + player1.width){
            // Left Side of Ball Touches Right Side of Player1
            ball.velocityX *= -1;  // Flip X Direction
        }
    }else if(detectCollision(ball, player2)){
        if(ball.x + ball.width >= player2.x){
            // Right Side of Ball Touches Left Side of Player2
            ball.velocityX *= -1;  // Flip X Direction
        }
    }

    // Game Over
    if(ball.x < 0){
        player2Score++;
        resetGame(1);
    }else if(ball.x + ballWidth >boardWidth){
        player1Score++;
        resetGame(-1);
    }

    // Score 
    context.font = "45px sans-serif";
    context.fillText(player1Score, boardWidth/5, 45);
    context.fillText(player2Score, boardWidth*4/5 -45, 45);

    // Draw Dotted Line Down the Middle
    for(let i = 10; i < board.height; i += 25){
        // i = Starting y Position, Draw a Square Every 25 Pixels Down
        // (x Position = Half of boardWidth - 10), i = y Position, Width = 5, Height = 5
        context.fillRect(board.width/2 - 10, i, 5, 5);
    }
}

function outOfBounds(yPosition){
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

function movePlayer(e){
    // Player 1
    if(e.code == "KeyW"){
        player1.velocityY = -3;
    }else if(e.code == "KeyS"){
        player1.velocityY = 3;
    }

    // Player 2
    if(e.code == "ArrowUp"){
        player2.velocityY = -3;
    }else if(e.code == "ArrowDown"){
        player2.velocityY = 3;
    }
}

function detectCollision(a, b){
    return a.x < b.x + b.width &&  // a's Top Left Corner doesnt reach b's Top Right Corner
           a.x + a.width > b.x &&  // a's Top Right Corner passes b's Top Left Corner
           a.y < b.y + b.height &&  // a's Top Left Corner doesnt reach b's Bottom Left Corner
           a.y + a.height > b.y;  // a's Bottom Left Corner passes b's Top Left Corner
}

function resetGame(direction){
    ball = {
        x : boardWidth/2,
        y : boardHeight/2,
        width : ballWidth,
        height : ballHeight,
        velocityX : direction,
        velocityY : 2
    }
}