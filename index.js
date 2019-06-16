const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


// rectangle
//to add color to rect
// c.fillStyle = "magenta";
// c.fillRect(50, 50 , 50 , 50);
// c.fillStyle = "red";
// c.fillRect(150, 50 , 50 , 50);
// c.fillStyle = "blue";
// c.fillRect(250, 50 , 50 , 50);

// //line
// c.beginPath();
// c.moveTo(50, 150);
// c.lineTo(300, 300);
// c.lineTo(600, 600);
// //to add colors to line
// c.strokeStyle = "#n1o1m2";
// c.stroke();

// to make arc using canvas
//c.arc(x, y, r, startangle, endangle, drawcounterclockwise(true/false));
// c.beginPath();
// c.arc(200, 400, 40,0, Math.PI * 2, false);
// c.strokeStyle = "brown";
// c.stroke();

//to make multiple circles use loops
// for(i=0; i<120; i++){
//   c.beginPath();
// c.arc(i*3, i*3, 40,0, Math.PI * 2, false);
// c.strokeStyle = "brown";
// c.stroke();
// }

const color = [
  "#6600CC",
  "#FFCC00",
  "#9EA9F0",
  "#CC0000",
]

// for(i=0; i<100; i++){
//   const x = Math.random() * window.innerWidth;
//   const y = Math.random() * window.innerHeight;
//   const r = Math.floor(Math.random() * 10) + 25   


//   var a = 255*Math.random()|0;
//   var g = 255*Math.random()|0;
//   var b = 255*Math.random()|0;
//   c.beginPath();
//   c.arc(x, y, r,0, Math.PI * 2, false);
//   c.strokeStyle = 'rgb(' + a + ',' + g + ',' + b + ')';
//   // c.fill();
//   c.stroke();
// }


// to make arc using canvas
//c.arc(x, y, r, startangle, endangle, drawcounterclockwise(true/false));
// c.beginPath();
// c.arc(200, 400, 40,0, Math.PI * 2, false);
// c.strokeStyle = "brown";
// c.stroke();

var maxRadius = 20;
var minRadius = 2;
var mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})

function Circle(x, y, dx, dy, radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color[Math.floor(Math.random() * color.length)];

  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color
    c.fill();
    c.stroke(); 
  }

  this.update = function(){
    this.draw();
    if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
      this.dx = -this.dx;
    }
    if(this.y + this.radius >= canvas.height || this.y - this.radius <= 0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y -= this.dy;

    if(mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100 && this.radius < maxRadius){
      this.radius += 1;
    }
    else if(this.radius > minRadius){
      this.radius -= 1;

    }

  }

}

var circleArray = [];

function init(){
  circleArray = [];
  for(var i = 0; i < 200; i++){
    var r = Math.floor(Math.random() * 3) + 1 ;
    var x = Math.random() * (innerWidth - r*2) + r;
    var y = Math.random() * (innerHeight - r*2) + r;
    var dx = (Math.random() - 0.5) * 5;
    var dy = (Math.random() - 0.5) * 5;
    circleArray.push(new Circle(x, y, dx, dy, r));
  }
}

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for(i = 0; i < circleArray.length ; i++){
    circleArray[i].update();
  }
}

animate();
init();