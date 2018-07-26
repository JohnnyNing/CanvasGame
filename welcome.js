var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
console.log("canvas");
ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.font = "40px Comic Sans MS";
ctx.fillStyle = "red";
ctx.fillText("Click Play to Play", 1,90); 

