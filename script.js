const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

const canvas = document.getElementById("techCanvas");
const ctx = canvas.getContext("2d");
let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const particles = [];
const particleCount = 60;
for(let i=0;i<particleCount;i++){
  particles.push({
    x: Math.random()*width,
    y: Math.random()*height,
    vx: (Math.random()-0.5)*0.5,
    vy: (Math.random()-0.5)*0.5,
    size: Math.random()*3+1
  });
}

function animate(){
  ctx.clearRect(0,0,width,height);

  for(let p of particles){
    ctx.fillStyle = "rgba(255,211,105,0.7)";
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();

    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>width) p.vx*=-1;
    if(p.y<0||p.y>height) p.vy*=-1;
  }

  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      let dx=particles[i].x-particles[j].x;
      let dy=particles[i].y-particles[j].y;
      let dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){
        ctx.strokeStyle="rgba(255,211,105,"+(1-dist/120)*0.5+")";
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}
animate();
