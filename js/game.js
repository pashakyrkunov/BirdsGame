var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var sup = document.getElementById("myCanvas");

//изображения
var bird = new Image();
var bg = new Image();
var angryBird = new Image();
var angryBird1 = new Image();
var day = new Image();

bird.src = "img/bird.png";
bg.src = "img/sky.png";
angryBird.src = "img/angry_bird.png";
angryBird1.src = "img/angry_bird1.png";
day.src = "img/day.jpg";

//очки, при которых появится доп.здоровье
var health_score = 0;
//частота появления птиц
var bound = 0;
//определяем health_score и bound в зависимости от уровня сложности
if(window.localStorage.level == 'low') {
  health_score = 10;
  bound = 950;
}
else if (window.localStorage.level == 'medium') {
  health_score = 100;
  bound = 975;
}
else if(window.localStorage.level == 'hard') {
  health_score = 999;
  bound = 995;
}

var hp = 1;
var count = 0;

var countBirds = 0;
// При нажатии на какую-либо кнопку
document.addEventListener("keydown", function(event) {
  if(event.key == "ArrowUp") {
    moveUp();
  }
});

//"подпрыгивание" птички
function moveUp() {
 yPos -= 20;
}

// Создание angry birds
var birds = [];

birds[0] = {
 x : cvs.width,
 y : randomInteger(0.5, 470)
}

var score = 0;
if (window.sessionStorage.score_after === undefined) {
   score = 0;
}
else {
   score = window.sessionStorage.score_after;
}

window.localStorage.score = score;

// Позиция птички
var xPos = 10;
var yPos = 220;
var grav = 1.5;

var mouseDown = false;
window.onmousedown = function() {
  mouseDown = true;
}

window.onmouseup = function() {
  mouseDown = false;
}
//определяем,что доп.здоровье на птичке
document.onmousemove = mousemove;
 function mousemove(event) {

  var mouse_x = event.clientX;
  var mouse_y = event.clientY;
  
  if (mouseDown == true && mouse_x < xPos + 40 && mouse_x > xPos - 40
      && mouse_y < yPos + 40 && mouse_y > yPos - 40) {
        clean();
  }
}

//удаляем сердечко, увеличиваем хп
function clean () {
  $('canvas').removeLayer('health').drawLayers();
  hp = 2;
}

//основная функция
function draw() {
  if (window.localStorage.theme == 'dark') {
    ctx.drawImage(bg, 0, 0);
  }
  else {
    ctx.drawImage(day, 0, 0);
  }
 for(var i = 0; i < birds.length; i++) {
   if(window.localStorage.theme == 'dark') {
    ctx.drawImage(angryBird1, birds[i].x, birds[i].y);
   }
   else {
    ctx.drawImage(angryBird, birds[i].x, birds[i].y);
   }

 //добавления сердечка с доп.здоровьем
 if (score == health_score && birds[i].x == 5) {$('canvas' ).drawImage({
  source: 'img/hp.png',
  layer: true,
  name: 'health',
  draggable: true,
  bringToFront: true,
  x: 20, y: 20,
});
}

 birds[i].x--;

 //создание новых птичек
 if(birds[i].x == bound) {
 birds.push({
 x : cvs.width,
 y : randomInteger(0.5, 470)
 });
 countBirds++;
 }

 if (birds[i].x == 0) {
   birds.slice(count, 1);
   countBirds--;
 }

 //обнаружение столкновений
 if(xPos >= birds[i].x - angryBird.width/2 && xPos <= birds[i].x + angryBird.width/2 && yPos <= birds[i].y + angryBird.height
      && yPos >= birds[i].y - angryBird.height + 15 || yPos <= 0 || yPos >= cvs.height) {
    if (hp == 1) {
      window.sessionStorage.score_after = score;
      window.location.href = 'YouDiedPage.html';
    }

    else {
      window.sessionStorage.score_after = score;
      window.location.href = 'Restart_page.html';
    }

 } 

 //подсчёт очков
 if(birds[i].x == 5) {
 score++;
 if(window.localStorage.score < score) {
   window.localStorage.score = score;
 }

 if(window.localStorage.best_score === undefined || window.localStorage.best_score < window.localStorage.score) {
   window.localStorage.best_score = window.localStorage.score;
 }
 }
 }

 ctx.drawImage(bird, xPos, yPos);

 yPos += grav;


 ctx.fillStyle = "#560319";
 ctx.strokeStyle = "#FFF";
 ctx.font = "45px Verdana";

 ctx.fillText("Счет:" + score, 10, cvs.height - 20);
 ctx.strokeText("Счет:" + score, 10, cvs.height - 20);
 ctx.fillText("HP:" + hp, 250, cvs.height - 20);
 ctx.strokeText("HP:" + hp, 250, cvs.height - 20);

 ctx.font = "25px Verdana";
 ctx.fillText("Кол-во птичек:" + countBirds, 600, cvs.height - 20);

 requestAnimationFrame(draw);

}


bird.onload = draw;

function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}