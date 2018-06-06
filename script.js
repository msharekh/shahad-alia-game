
// VARIABILESF
var c=document.getElementById('myCanvas');
var ctxDrawer=c.getContext('2d'); 
 
var running=true;
var finished=false;

var score=0;

var isCollision;

var WIDTH=300;
var HEIGHT=150;

 
var keys=[];

var isJumping=false;
var speedJump=20;
var g=9.8;

var t0,posx,posy,pos0x,pos0y,speed0x,speed0y ;



//OBJECTS
var fire={
  x:10,
  y:0,
  turnSpeed:10,
  width:40,
  height:30
};

var land={
  x:0,
  y:0,
  color:'#D2691E', 
  width:WIDTH,
  height:30
};

var sky={
  x:0,
  y:0,
  color:'#6495ED',
  width:WIDTH,
  height:HEIGHT-land.height
};



//left and right by KEYS LISTENTERS
window.onkeydown = function(e) {
   keys[e.keyCode]=true; 
    
}

window.onkeyup = function(e) {
  delete keys[e.keyCode];
  
}
 
function currentTime() {
  var date = new Date();
  return date;
}


 

//GAME
function run(){
  update();
  render();
}

function startJump() {

  if (!isJumping) // Only jump if it is not yet currently jumping
  {
      t0=currentTime();
      pos0x=fire.x;
      speed0x = fire.turnSpeed;
      speed0y += speedJump;
      isJumping = true;
  }
}

//ACITON
function update(){
   

  //fire right & left
  if (keys[39]) {
      //Right
      s('right '+fire.x+"|"+fire.width+"|"+WIDTH);
      if (fire.x+fire.width<WIDTH) fire.x+=fire.turnSpeed;
  }
  if (keys[37]) {
      //Left
      s('left '+fire.x+"|"+fire.width+"|"+WIDTH);
      if (fire.x>0) fire.x-=fire.turnSpeed;
  }

//fire up & down
  if (keys[38]) {
      //up
      s('up');
      //when press up it will jump
      startJump();
     
  }
  if (keys[40]) {
      //down
      s('down');
      
  }

  
  if (isJumping)
  {

      t = Math.abs(t0-currentTime());  // difference in millisecond

      // t = currentTime()-t0;

      posy = pos0y + speed0y*t - g*t*t;
      posx = pos0x + speed0x*t;

      // And test that the character is not on the ground again.
      if (posy < HEIGHT-fire.height)
      {
          posy=HEIGHT-fire.height;
          isJumping = false;
      }
  }
   
   
}



//DRAWING
function render(){

  //clear

//frame
  ctxDrawer.fillStyle='black';
  ctxDrawer.strokeRect(0,0, WIDTH,HEIGHT);

// var WIDTH=300;
// var HEIGHT=150;


   //sky
  ctxDrawer.fillStyle=sky.color;
  ctxDrawer.fillRect(sky.x,sky.y,sky.width,sky.height);

  

   
//land
  ctxDrawer.fillStyle=land.color;
  ctxDrawer.fillRect(land.x,HEIGHT-land.height,land.width,land.height);

   
  //draw fire
  var fireImg=new Image();
  fireImg.src="fire.png";
  ctxDrawer.drawImage(fireImg,fire.x,fire.y+HEIGHT-fire.height-land.height+5,fire.width,fire.height);

  score=fire.x+" - "+fire.y+" || "+fire.width+" - "+fire.height+" || "+WIDTH+" - "+HEIGHT;
   
  //draw score 
  ctxDrawer.font = "9px arial";
// Create gradient
 
  // Fill with gradient
   ctxDrawer.fillStyle='black';
  ctxDrawer.fillText(score, 100, 10);

  
   

}





//FUNTIONS



function resetGame(){
  score=0;
  finished=false;

   //sound    
    var snd = new Audio("sound1.wav"); // buffers automatically when created
    snd.play();

    
   
  



  //running=true;
}
 
function s(x){
  console.log(x);
}


//LIFE

setInterval(function(){
  //while(running)  
  if(running && !finished) {
   run(); 
  }
  if(finished){
    //end game
    resetGame();
  }
},100);

/****** Test-Driven Development (TDD) *****/
 


//TDD
 

/****** Test-Driven Development (TDD) *****/
