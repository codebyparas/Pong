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