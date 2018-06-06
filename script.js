
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

// var t0,posx,posy,pos0x,pos0y,speed0x,speed0y ;


//OBJECTS
var fire={
  x0:10,
  x:0,
  y0:0,
  y:0,
  turnSpeed:8,
  img:'fire.png',
  width:50,
  height:40
};

var land={
  x:0,
  y:0,
  color:'#D2691E', 
  width:WIDTH,
  height:40
};

var sky={
  x:0,
  y:0,
  color:'#6495ED',
  width:WIDTH,
  height:HEIGHT-land.height
};

var lake={
  x:0,
  y:0,
  img:'lake.png',
  width:150,
  height:120
};

var sun={
  x:WIDTH/2,
  y:5, 
  img:'sun.png',
  width:150,
  height:120
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

var jump=false;
var velocityY=10;
var jumpHeightSquared=16;
var gravityAccelerationY=10;
var time=2;

var info ='';


// function startJump() {

//   if (!isJumping) // Only jump if it is not yet currently jumping
//   {
//       t0=currentTime();
//       pos0x=fire.x;
//       speed0x = fire.turnSpeed;
//       speed0y += speedJump;
//       isJumping = true;
//   }
// }

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
      // jump=true;
      info='jump';
      
      //jump
      if (fire.y+fire.height>0)
        fire.y-=fire.turnSpeed;


    }
    else {
      // down
      info ='down';
      info=fire.y+" : "+fire.y0;
      if (fire.y<fire.y0)
        fire.y+=fire.turnSpeed;
    }


    if (keys[40]) {
      //down
      s('down');
      
    }


  // if (isJumping)
  // {

  //     t = Math.abs(t0-currentTime());  // difference in millisecond

  //     // t = currentTime()-t0;

  //     posy = pos0y + speed0y*t - g*t*t;
  //     posx = pos0x + speed0x*t;

  //     // And test that the character is not on the ground again.
  //     if (posy < HEIGHT-fire.height)
  //     {
  //         posy=HEIGHT-fire.height;
  //         isJumping = false;
  //     }
  // }

  // if (jump) {
  //   velocityY = -jumpHeightSquared;

  // }

  // velocityY += gravityAccelerationY * time;
  // fire.y += velocityY * time;

  // if (fire.y>0) {
  //   fire.y = 0;
  //   velocityY = 0;
  // }
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



   
  //draw land
  ctxDrawer.fillStyle=land.color;
  land.y=HEIGHT-land.height;
  ctxDrawer.fillRect(land.x,land.y,land.width,land.height);

  //draw lake
   
  var lakeImg=new Image();
  lakeImg.src=lake.img;
  lake.x=(WIDTH/2)-(lake.width/2);
  lake.y=HEIGHT-lake.height-9;
  ctxDrawer.drawImage(lakeImg,lake.x,lake.y,lake.width,lake.height);

  //draw sun
   
  var sunImg=new Image();
  sunImg.src=sun.img;
  lake.x=(WIDTH/2)-(lake.width/2);
  lake.y=HEIGHT-lake.height-9;
  ctxDrawer.drawImage(sunImg,sun.x,sun.y,sun.width,sun.height);



  //draw fire
  var fireImg=new Image();
  fireImg.src=fire.img;
  ctxDrawer.drawImage(fireImg,fire.x,fire.y+HEIGHT-fire.height-land.height+5,fire.width,fire.height);

  score=fire.x+" - "+fire.y+" || "+fire.width+" - "+fire.height+" || "+WIDTH+" - "+HEIGHT;

  //draw score 
  ctxDrawer.font = "9px arial";
// Create gradient

  // Fill with gradient
  ctxDrawer.fillStyle='black';
  ctxDrawer.fillText(info, 100, 10);

  


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
