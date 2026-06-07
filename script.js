const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let lives = 3;

let shipX = canvas.width/2;
let shipY = canvas.height-180;

const keys = {};

window.addEventListener("keydown",(e)=>{
    keys[e.key]=true;
});

window.addEventListener("keyup",(e)=>{
    keys[e.key]=false;
});

const stars=[];
const crystals=[];
const asteroids=[];

for(let i=0;i<1000;i++){
    stars.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*2
    });
}

function spawnCrystal(){
    crystals.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height
    });
}

function spawnAsteroid(){
    asteroids.push({
        x:Math.random()*canvas.width,
        y:-50,
        size:20+Math.random()*30,
        speed:2+Math.random()*4
    });
}

setInterval(spawnCrystal,1200);
setInterval(spawnAsteroid,1500);

function drawStars(){

    stars.forEach(s=>{

        ctx.fillStyle="white";

        ctx.fillRect(
            s.x,
            s.y,
            s.r,
            s.r
        );

    });

}

function drawSaturn(){

    const x=250;
    const y=220;

    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(.4);

    ctx.strokeStyle="#d8c39a";
    ctx.lineWidth=22;

    ctx.beginPath();
    ctx.ellipse(0,0,170,55,0,0,Math.PI*2);
    ctx.stroke();

    ctx.lineWidth=8;

    ctx.beginPath();
    ctx.ellipse(0,0,200,70,0,0,Math.PI*2);
    ctx.stroke();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(x,y,95,0,Math.PI*2);

    const g=
    ctx.createRadialGradient(
    x-30,y-30,10,
    x,y,120
    );

    g.addColorStop(0,"#fff4c4");
    g.addColorStop(1,"#c18b4c");

    ctx.fillStyle=g;
    ctx.fill();
}

function drawEarth(){

    const x=canvas.width-250;
    const y=canvas.height-220;

    ctx.beginPath();
    ctx.arc(x,y,110,0,Math.PI*2);

    const g=
    ctx.createRadialGradient(
    x-30,y-30,20,
    x,y,120
    );

    g.addColorStop(0,"#5ec8ff");
    g.addColorStop(1,"#1b5cff");

    ctx.fillStyle=g;
    ctx.fill();

    ctx.fillStyle="green";

    ctx.beginPath();
    ctx.arc(x-25,y-10,25,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x+30,y+25,18,0,Math.PI*2);
    ctx.fill();
}

function drawAlienShip(){

    if(keys["ArrowLeft"]) shipX-=6;
    if(keys["ArrowRight"]) shipX+=6;
    if(keys["ArrowUp"]) shipY-=6;
    if(keys["ArrowDown"]) shipY+=6;

    ctx.fillStyle="silver";

    ctx.beginPath();
    ctx.ellipse(
        shipX,
        shipY,
        70,
        30,
        0,
        0,
        Math.PI*2
    );
    ctx.fill();

    ctx.fillStyle=
    "rgba(100,255,255,.5)";

    ctx.beginPath();
    ctx.arc(
        shipX,
        shipY-20,
        28,
        0,
        Math.PI*2
    );
    ctx.fill();

    ctx.font="28px Arial";
    ctx.fillText(
        "👽",
        shipX-16,
        shipY-10
    );
}

function drawCrystals(){

    for(let i=crystals.length-1;i>=0;i--){

        const c=crystals[i];

        ctx.fillStyle="#bb66ff";

        ctx.beginPath();
        ctx.moveTo(c.x,c.y-15);
        ctx.lineTo(c.x+10,c.y);
        ctx.lineTo(c.x,c.y+15);
        ctx.lineTo(c.x-10,c.y);
        ctx.fill();

        const d=Math.hypot(
            c.x-shipX,
            c.y-shipY
        );

        if(d<80){

            score++;

            document.getElementById(
            "score"
            ).textContent=score;

            crystals.splice(i,1);

            if(score>=20){

                alert("🏆 GANASTE LA MISIÓN");

                score=0;
            }
        }
    }
}

function drawAsteroids(){

    for(let i=asteroids.length-1;i>=0;i--){

        const a=asteroids[i];

        a.y+=a.speed;

        ctx.fillStyle="#777";

        ctx.beginPath();
        ctx.arc(
            a.x,
            a.y,
            a.size,
            0,
            Math.PI*2
        );
        ctx.fill();

        const d=Math.hypot(
            a.x-shipX,
            a.y-shipY
        );

        if(d<a.size+40){

            lives--;

            document.getElementById(
            "lives"
            ).textContent=lives;

            asteroids.splice(i,1);

            if(lives<=0){

                alert("💀 GAME OVER");

                location.reload();
            }
        }
    }
}

function animate(){

    ctx.fillStyle="#020617";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawStars();
    drawSaturn();
    drawEarth();

    drawCrystals();
    drawAsteroids();

    drawAlienShip();

    requestAnimationFrame(
        animate
    );
}

animate();
