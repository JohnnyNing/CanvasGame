var canvas  = document.querySelector('canvas');
console.log(canvas);
canvas.margin = 100;
canvas.width = 800;
canvas.height = 600;

// play button trigger 
var isPlaying = false;

// reference for the layout to help locate mouse position
var item3 = document.getElementById('mainFrame');
var GAMEOVERMSG = "Hhahaha...  You are dead!!" + '\n' + "Your living time is: ";


var c = canvas.getContext('2d');

// set timer
 var time_sec = 0;
 var time_min = 0;
// 	function pad ( val ) { return val > 9 ? val : "0" + val; }
// 	setInterval( function(){
// 			        time_sec=pad(++time_sec%60);
// 			        time_min=pad(parseInt(time_sec/60,10));
// 			    }, 1000);

// setting timer 
function timmer(){
	time_sec++;
	if(time_sec % 3 ==0){
			circleArray.push(new Circle(Math.random()*canvas.width,Math.random()*canvas.height,time_sec/3,time_sec/3,10));
		}
	t = setTimeout("timmer()", 1000);

}

function stopTimmer(){
	clearTimeout(t);
}


var Mouse = {
	x: undefined,
	y: undefined

}

var player_HP = 100;
var player_Score = 0;


	

// creating player object 

function Player(x,y,radius){
	this.x = x;
	this.y = y;
	this.radius = radius;

	this.draw = function () {
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.fillStyle = "red";
		c.fill();
		c.strokeStyle = "white";
		c.stroke();
	}

	this.update = function(){

		this.x = Mouse.x - canvas.offsetLeft ;
		this.y = Mouse.y - canvas.offsetTop - item3.offsetTop;
		if(Mouse.x - canvas.offsetLeft<0){
			this.x = 0+this.radius;
		}
		if(Mouse.x - canvas.offsetLeft > canvas.width){
			this.x = canvas.width-this.radius;
		}
		if(Mouse.y - canvas.offsetTop - item3.offsetTop<0){
			this.y = 0+this.radius;
		}

		if(Mouse.y - canvas.offsetTop - item3.offsetTop>canvas.height){
			this.y = canvas.height-this.radius;
		}
	}
}
var player= new Player(canvas.width/2,canvas.height/2,20);

//tracking the mouse movement 
window.addEventListener('mousemove', function(event){
	Mouse.x = event.x;
	Mouse.y = event.y;

})




// this is the object, moving around on the canvas
function Circle(x,y,dx,dy,radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = function(){
		c.beginPath();

		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.fillStyle = 'white';
		c.fill();
		c.strokeStyle = "white"
		c.stroke();
		

	}

	this.update = function(){
		if(this.x+this.radius >= canvas.width-10 || this.x-this.radius <= 0){ this.dx = -this.dx; }
		if(this.y+this.radius >= canvas.height-10 || this.y-(this.radius*2) <= 0){this.dy = -this.dy;}

		
		
		this.x+=this.dx;
		this.y+=this.dy;
		
		
	}

}


var circleArray = [];
//***************creating enimies
for(var i = 0; i<1; i++){
	var x = Math.floor(Math.random()*Math.random()*(canvas.width)  );
	var y = Math.floor(Math.random()*Math.random()*(canvas.height) );
	var dx = Math.random()*5;
	var dy = Math.random()*5;

	circleArray.push(new Circle(x,y,dx,dy,10));
}


// this is the calculation of the distance of the player and the circles 
function getDistance(x1, y1, x2, y2){
	let xDistance = x2 - x1;
	let yDistance = y2 - y1;

	return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2));
}


// the most important part
function animate(){
	//creating a loop, call cycling through the argument in the parenthsis
	
	
	
	if(isPlaying){
		
	requestAnimationFrame(animate);

	c.clearRect(0,0,canvas.width,canvas.height);
	c.fillStyle = "black";
	c.fillRect(0,0,canvas.width,canvas.height);


	 
	 player.draw();
	 player.update();

	

		


	for(var i=0; i<circleArray.length; i++){
		
		circleArray[i].draw();
		circleArray[i].update();


		
		if(getDistance(player.x,player.y,circleArray[i].x,circleArray[i].y) >= 0 && getDistance(player.x,player.y,circleArray[i].x,circleArray[i].y)<= player.radius+circleArray[i].radius){
			player.radius+=1;
			--player_HP;
			if(player_HP<0 ){
				player_HP = 0;
				player.radius = 5;

					if (confirm(GAMEOVERMSG+time_sec+" seconds" + "\n"+"Press OK to play again, Press cancel to quit")) {
				       location.reload();

				    } else {
				        location.reload();

				    }

			}
		}
		//console.log(getDistance(player.x,player.y,circleArray[i].x,circleArray[i].y));
			}

	}else{}
	 c.font = "18px arial";
	 c.fillStyle = '#fff';
	 c.fillText('Your HP: ' + player_HP, 15, 35);
	 //c.fillText('Your Score: ' + player_Score, 350, 35);
	 c.fillText('Time:   '+ time_sec+ " seconds", 600, 35);
}


 

function play_pause_btn_clicked(){
	
	if(isPlaying){
		document.getElementById('play_pause_btn').innerHTML = "Play Again";
		
		
			
			isPlaying = false;
			stopTimmer();
	}else{
		document.getElementById('play_pause_btn').innerHTML = "Pause";
		
		isPlaying = true;
		animate();
		timmer();
		
	}
}

