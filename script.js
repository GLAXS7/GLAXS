alert("SCRIPT CARGADO");

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const stars = [];

for(let i=0;i<1200;i++){
    stars.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*2
    });
}

let orbit = 0;
let score = 0;

let shipX = canvas.width/2;
let shipY = canvas.height-180;

const keys = {};

window.addEventListener("keydown",(e)=>{
    keys[e.key] = true;
});

window.addEventListener("keyup",(e)=>{
    keys[e.key] = false;
});

function drawPlanet(x,y,r,color){
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fillStyle=color;
    ctx.fill();
}

function drawSaturn(){

    const x=250;
    const y=250;

    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(0.4);

    ctx.strokeStyle="rgba(255,220,180,.8)";
    ctx.lineWidth=18;

    ctx.beginPath();
    ctx.ellipse(0,0,140,45,0,0,Math.PI*2);
    ctx.stroke();

    ctx.restore();

    drawPlanet(x,y,90,"#d6a96c");
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

    orbit += 0.01;

    const x =
        canvas.width-280 +
        Math.cos(orbit)*180;

    const y =
        canvas.height-220 +
        Math.sin(orbit)*180;

    drawPlanet(x,y,25,"#dddddd");
}

let crystals = [];

function spawnCrystal(){

    crystals.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height
    });

}

setInterval(spawnCrystal,1000);

function drawCrystals(){

    crystals = crystals.filter(c=>{

        const dx = c.x - shipX;
        const dy = c.y - shipY;

        const distance =
            Math.sqrt(dx*dx + dy*dy);

        if(distance < 90){

            score++;

            const scoreElement =
                document.getElementById("score");

            if(scoreElement){
                scoreElement.textContent = score;
            }

            return false;
        }

        ctx.fillStyle="#bb66ff";

        ctx.beginPath();
        ctx.moveTo(c.x,c.y-15);
        ctx.lineTo(c.x+10,c.y);
        ctx.lineTo(c.x,c.y+15);
        ctx.lineTo(c.x-10,c.y);
        ctx.fill();

        return true;
    });
}

function drawAlienShip(){

    if(keys["ArrowLeft"]) shipX -= 6;
    if(keys["ArrowRight"]) shipX += 6;
    if(keys["ArrowUp"]) shipY -= 6;
    if(keys["ArrowDown"]) shipY += 6;

    if(shipX < 80) shipX = 80;
    if(shipX > canvas.width-80) shipX = canvas.width-80;

    if(shipY < 80) shipY = 80;
    if(shipY > canvas.height-80) shipY = canvas.height-80;

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

    ctx.fillStyle="rgba(150,255,255,.5)";

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

    ctx.strokeStyle="lime";
    ctx.lineWidth=3;

    ctx.beginPath();
    ctx.moveTo(shipX,shipY);
    ctx.lineTo(shipX,shipY+120);
    ctx.stroke();
}

function animate(){

    ctx.fillStyle="#01030f";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    stars.forEach(s=>{

        ctx.fillStyle="white";

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

    requestAnimationFrame(animate);
}

animate();

document.getElementById("startBtn").onclick = ()=>{

    document.querySelector(".center").style.display = "none";

};
