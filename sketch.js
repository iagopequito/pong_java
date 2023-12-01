let ballX, ballY; let ballSpeedX, ballSpeedY; let paddle1Y, paddle2Y; const paddleHeight = 80; const paddleWidth = 10; const ballSize = 10; const speedMultiplier = 1.1; let player1Score = 0; let player2Score = 0;

function setup() { createCanvas(800, 400); ballX = width / 2; ballY = height / 2; ballSpeedX = 3; ballSpeedY = 3; paddle1Y = height / 2 - paddleHeight / 2; paddle2Y = height / 2 - paddleHeight / 2; }

function draw() { background(0);

// Desenhar a mesa de ping pong stroke(255); strokeWeight(2); line(width / 2, 0, width / 2, height);

fill(255); rect(width - paddleWidth - 10, paddle1Y, paddleWidth, paddleHeight); rect(10, paddle2Y, paddleWidth, paddleHeight); ballX += ballSpeedX; ballY += ballSpeedY;

if ( ballX + ballSize / 2 >= width - paddleWidth - 10 && ballY + ballSize / 2 >= paddle1Y && ballY - ballSize / 2 <= paddle1Y + paddleHeight ) { if (ballSpeedX > 0) { ballSpeedX *= -speedMultiplier; ballSpeedY = calculateBallSpeedY(paddle1Y, ballY); } }

if ( ballX - ballSize / 2 <= paddleWidth + 10 && ballY + ballSize / 2 >= paddle2Y && ballY - ballSize / 2 <= paddle2Y + paddleHeight ) { if (ballSpeedX < 0) { ballSpeedX *= -speedMultiplier; ballSpeedY = calculateBallSpeedY(paddle2Y, ballY); } }

if (ballY < ballSize / 2 || ballY > height - ballSize / 2) { ballSpeedY *= -1; }

if (ballX < 0) { player2Score++; resetBall(); }

if (ballX > width) { player1Score++; resetBall(); }

fill(255); ellipse(ballX, ballY, ballSize, ballSize);

if (keyIsDown(DOWN_ARROW)) { paddle1Y += 5; } else if (keyIsDown(UP_ARROW)) { paddle1Y -= 5; }

if (keyIsDown(83)) { paddle2Y += 5; } else if (keyIsDown(87)) { paddle2Y -= 5; }

paddle1Y = constrain(paddle1Y, 0, height - paddleHeight); paddle2Y = constrain(paddle2Y, 0, height - paddleHeight);

textSize(24); textAlign(CENTER); fill(255); text(player1Score, width / 4, 50); text(player2Score, (3 * width) / 4, 50); }

function resetBall() { ballX = width / 2; ballY = height / 2; ballSpeedX = random([-3, 3]); ballSpeedY = random([-3, 3]); }

function calculateBallSpeedY(paddleY, ballY) { let relativeIntersectY = paddleY + paddleHeight / 2 - ballY; return (relativeIntersectY / (paddleHeight / 2)) * 5; }