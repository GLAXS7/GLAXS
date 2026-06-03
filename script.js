const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 600;

let score = 0;
let level = 1;

let mouse = {
x: canvas.width/2,
y: canvas.height/2
};

canvas.addEventListener("mousemove",(e)=>{

const rect = canvas.getBoundingClientRect();

mouse.x =
(e.clientX-rect.left) *
(canvas.width/rect.width);

mouse.y =
(e.clientY-rect.top) *
(canvas.height/rect.height);

});

const player = {
x: canvas.width/2,
y: canvas.height/2,
r: 18
};

const enemy = {
x: 100,
y: 100,
r: 24,
speed: 1.5
};

const gems = [];

function spawnGem(){

gems.push({

x: Math.random()*canvas.width,
y: Math.random()*canvas.height,

vx:(Math.random()-0.5)*2,
vy:(Math.random()-0.5)*2,

r:15

});

}

for(let i=0;i<20;i++){
spawnGem();
}

function distance(a,b){

return Math.hypot(
a.x-b.x,
a.y-b.y
);

}

function updateLevel(){

level = Math.floor(score/5)+1;

document.getElementById(
"level"
).textContent = level;

if(level<=3){

enemy.speed = 1.5;

}else if(level<=7){

enemy.speed = 3;

}else{

enemy.speed = 5;
}

}

function draw(){

ctx.clearRect(
0,0,
canvas.width,
canvas.height
);

player.x +=
(mouse.x-player.x)*0.06;

player.y +=
(mouse.y-player.y)*0.06;

let angle = Math.atan2(
player.y-enemy.y,
player.x-enemy.x
);

enemy.x +=
Math.cos(angle) *
enemy.speed;

enemy.y +=
Math.sin(angle) *
enemy.speed;

gems.forEach((gem,index)=>{

gem.x += gem.vx;
gem.y += gem.vy;

if(
gem.x<0 ||
gem.x>canvas.width
){
gem.vx*=-1;
}

if(
gem.y<0 ||
gem.y>canvas.height
){
gem.vy*=-1;
}

ctx.font = "24px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

ctx.fillText(
"💎",
gem.x,
gem.y
);

if(
distance(player,gem)
<
player.r+gem.r
){

score++;

document.getElementById(
"score"
).textContent = score;

player.r += 0.5;

gems.splice(index,1);

spawnGem();

updateLevel();

}

});

ctx.beginPath();
ctx.fillStyle="#00ff88";
ctx.shadowColor="#00ff88";
ctx.shadowBlur=20;

ctx.arc(
player.x,
player.y,
player.r,
0,
Math.PI*2
);

ctx.fill();

ctx.beginPath();
ctx.fillStyle="red";
ctx.shadowColor="red";
ctx.shadowBlur=20;

ctx.arc(
enemy.x,
enemy.y,
enemy.r,
0,
Math.PI*2
);

ctx.fill();

ctx.shadowBlur=0;

if(
distance(player,enemy)
<
player.r+enemy.r
){

document.getElementById(
"gameover"
).style.display =
"block";

return;
}

requestAnimationFrame(draw);

}

draw();
