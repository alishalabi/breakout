// Class: Ball
class Ball {
  constructor(x, y, radius = 10) {
    this.x = x;
    this.y = y;
    this.dx = 3;
    this.dy = -3;
    this.radius = radius;
  }
  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

// Class: Paddle
class Paddle {
  constructor(x = canvas.width / 2, color = '#0095DD', width = 75, height = 10) {
    this.x = x;
    this.color = color;
    this.width = width;
    this.height = height;
  }
  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

// Class: Score
class Score {
  constructor(x = 8, y = 20, color = '#0095DD', font = '16px Arial', score = 0) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
    this.score = score;
  }
  update() {
    this.score += 1;
  }
  render(ctx) {
    ctx.beginPath();
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: 0`, this.x, this.y);

    // ctx.fillText(`Score: ${this.score}`, 8, 20);
    ctx.closePath();
  }

}


// Class: Lives
class Lives {
  constructor(x = canvas.width-65, y = 20, color = '#0095DD', font = '16px Arial', lives = 3) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
    this.lives = lives;
  }
  update() {
    this.lives -= 1;
  }
  render(ctx) {
    ctx.beginPath();
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText('Lives: '+this.lives, canvas.width-65, 20);
    // ctx.fillText(`Score: ${this.score}`, 8, 20);
    ctx.closePath();
  }

}

// function drawLives() {
//   ctx.font = '16px Arial';
//   ctx.fillStule = ;
//   ctx.fillText('Lives: '+this.lives, canvas.width-65, 20);
// }

// Class: Bricks


// Class: Game
// class Game {
//   constructor(dx = 4, dy = -4) {
//     this.dx = dx;
//     this.dy = dy;
//   }
// }




const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ball = new Ball(canvas.width / 2, canvas.height / 2);
const paddle = new Paddle()
const health = new Lives()
const score = new Score()
// const ballRadius = 10;
// let x = canvas.width / 2;
// let y = canvas.height - 30;
// let dx = 3;
// let dy = -3;
// const paddleHeight = 10;
// const paddleWidth = 75;
// let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;


// let score = 0;
// let lives = 3;

const bricks = [];

for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);


// Key Handlers
function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}
function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
}


// Collision Detection (Brick)
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        if (ball.x > brick.x && ball.x < brick.x + brickWidth && ball.y > brick.y && ball.y < brick.y + brickHeight) {
          ball.dy = -ball.dy;
          brick.status = 0;
          score.update();
          if (score === brickRowCount * brickColumnCount) {
            alert('YOU WIN, YOU ROCK!')
            document.location.reload()
            clearInterval(interval)
          }
        }
      }
    }
  }
}


// Draw Section
// function drawScore() {
//   ctx.font = '16px Arial';
//   ctx.fillStyle = '#0095DD';
//   ctx.fillText(`Score: ${score}`, 8, 20);
// }

// function drawBall() {
//   // ctx.beginPath();
//   // ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
//   // ctx.fillStyle = '#0095DD';
//   // ctx.fill();
//   // ctx.closePath();
// }
// function drawPaddle() {
//   ctx.beginPath();
//   ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
//   ctx.fillStyle = '#0095DD';
//   ctx.fill();
//   ctx.closePath();
// }


// Challenge 1.1: Bricks colored by row
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        if (r === 0) {
          ctx.fillStyle = '#0095DD';
        }
        else if (r === 1) {
          ctx.fillStyle = '#00FF00';
        }
        else if (r === 2) {
          ctx.fillStyle = '#FFA500';
        }
        ctx.fill();
        ctx.fillStyle = '#0095DD'
        ctx.closePath();
      }
    }
  }
}

// Challenge 1.2: Bricks colored by column
// function drawBricks() {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       if (bricks[c][r].status === 1) {
//         const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//         const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
//         bricks[c][r].x = brickX;
//         bricks[c][r].y = brickY;
//         ctx.beginPath();
//         ctx.rect(brickX, brickY, brickWidth, brickHeight);
//         if (c === 0) {
//           ctx.fillStyle = '#0095DD';
//         }
//         else if (c === 1) {
//           ctx.fillStyle = '#00FF00';
//         }
//         else if (c === 2) {
//           ctx.fillStyle = '#FFA500';
//         }
//         else if (c === 3) {
//           ctx.fillStyle = '#E71C25';
//         }
//         else if (c === 4) {
//           ctx.fillStyle = '#E5284E';
//         }
//         ctx.fill();
//         ctx.fillStyle = '#0095DD'
//         ctx.closePath();
//       }
//     }
//   }
// }


// Challenge 1.3: Alternate brick color
// function drawBricks() {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       if (bricks[c][r].status === 1) {
//         const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//         const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
//         bricks[c][r].x = brickX;
//         bricks[c][r].y = brickY;
//         ctx.beginPath();
//         ctx.rect(brickX, brickY, brickWidth, brickHeight);
//         if ((c + r) % 2 == 0) {
//           ctx.fillStyle = '#0095DD';
//         }
//         else {
//           ctx.fillStyle = '#D9393B'
//         }
//         ctx.fill();
//         ctx.fillStyle = '#0095DD'
//         ctx.closePath();
//       }
//     }
//   }
// }

// Challenge 1.4: Random Colors
// const colorsArray = [];
// for (let i = 0; i < (brickColumnCount * brickRowCount); i++) {
//   randomColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
//   colorsArray.push(randomColor)
// }
//
//
// function drawBricks() {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       if (bricks[c][r].status === 1) {
//         const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//         const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
//         bricks[c][r].x = brickX;
//         bricks[c][r].y = brickY;
//         ctx.beginPath();
//         ctx.rect(brickX, brickY, brickWidth, brickHeight);
//         ctx.fillStyle = colorsArray[(c * brickRowCount) + r]
//         console.log(colorsArray[(c * brickRowCount) + r])
//         ctx.fill();
//         ctx.fillStyle = '#0095DD';
//         ctx.closePath();
//       }
//     }
//   }
// }


// function drawBricks() {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       if (bricks[c][r].status === 1) {
//         const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//         const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
//         bricks[c][r].x = brickX;
//         bricks[c][r].y = brickY;
//         ctx.beginPath();
//         ctx.rect(brickX, brickY, brickWidth, brickHeight);
//         ctx.fillStyle = '#0095DD';
//         ctx.fill();
//         ctx.closePath();
//       }
//     }
//   }
// }


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.move()
  ball.render(ctx)
  paddle.render(ctx)
  health.render(ctx)
  collisionDetection();
  drawBricks();
  // drawLives();


  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      health.update();
      if (!health.lives) {
        alert('GAME OVER');
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        paddle.x = (canvas.width - paddle.width) / 2;
      }
    }
  }

  if (rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.x += 7;
  } else if (leftPressed && paddle.x > 0) {
    paddle.x -= 7;
  }

}

// Set Interval
const interval = setInterval(draw, 10);
