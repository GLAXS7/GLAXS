const canvas =
document.getElementById("space");

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

const stars=[];

for(let i=0;i<1200;i++){

stars.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2

});

}

let orbit=0;

function drawPlanet(x,y,r,color){

ctx.beginPath();

ctx.arc(
x,y,r,0,
Math.PI*2
);

ctx.fillStyle=color;
ctx.fill();

}

function drawSaturn(){

const x=250;
const y=250;

ctx.save();

ctx.translate(x,y);

ctx.rotate(.4);

ctx.strokeStyle=
"rgba(255,220,180,.7)";

ctx.lineWidth=18;

ctx.beginPath();

ctx.ellipse(
0,0,
140,45,
0,0,
Math.PI*2
);

ctx.stroke();

ctx.restore();

drawPlanet(
x,
y,
90,
"#d6a96c"
);

}

function drawJupiter(){

drawPlanet(
canvas.width-260,
220,
120,
"#c98052"
);

}

function drawEarth(){

drawPlanet(
canvas.width-280,
canvas.height-220,
110,
"#2f7cff"
);

}

function drawMoon(){

orbit+=0.01;

const x=
canvas.width-280+
Math.cos(orbit)*180;

const y=
canvas.height-220+
Math.sin(orbit)*180;

drawPlanet(
x,
y,
25,
"#ddd"
);

}

let crystals=[];

function spawnCrystal(){

crystals.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height

});

}

setInterval(
spawnCrystal,
1200
);

function drawCrystals(){

crystals.forEach(c=>{

ctx.fillStyle=
"#bb66ff";

ctx.beginPath();

ctx.moveTo(c.x,c.y-15);
ctx.lineTo(c.x+10,c.y);
ctx.lineTo(c.x,c.y+15);
ctx.lineTo(c.x-10,c.y);

ctx.fill();

});

}

function drawAlienShip(){

const x=
canvas.width/2;

const y=
canvas.height-180;

ctx.fillStyle=
"silver";

ctx.beginPath();

ctx.ellipse(
x,
y,
70,
30,
0,
0,
Math.PI*2
);

ctx.fill();

ctx.fillStyle=
"rgba(150,255,255,.5)";

ctx.beginPath();

ctx.arc(
x,
y-20,
28,
0,
Math.PI*2
);

ctx.fill();

ctx.font=
"28px Arial";

ctx.fillText(
"👽",
x-16,
y-10
);

ctx.strokeStyle=
"lime";

ctx.lineWidth=3;

ctx.beginPath();

ctx.moveTo(x,y);

ctx.lineTo(
x,
y+120
);

ctx.stroke();

}

function animate(){

ctx.fillStyle=
"#01030f";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

stars.forEach(s=>{

ctx.fillStyle=
"white";

ctx.fillRect(
s.x,
s.y,
s.r,
s.r
);

});

drawSaturn();
drawJupiter();
drawEarth();
drawMoon();

drawCrystals();

drawAlienShip();

requestAnimationFrame(
animate
);

}

animate();

document
.getElementById(
"startBtn"
)
.onclick=()=>{

document
.querySelector(
".center"
)
.style.display=
"none";

};
