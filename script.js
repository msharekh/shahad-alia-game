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
var isFalling=false;
// var t0,posx,posy,pos0x,pos0y,speed0x,speed0y ;
//OBJECTS
 
var fire={
  x0:10,
  x:0,
  y0:0,
  y:0,
  turnSpeed:8,
  img:'fire.png',
  width:30,
  height:30,
  jumping:true,
  x_velocity:0,
  y_velocity:0
};
var land={
  x:0,
  y:0,
  color:'#996633', 
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
  width:170,
  height:30
};
var sun={
  x:WIDTH-60,
  y:5, 
  img:'sun.png',
  width:60,
  height:40
};
var wood={
  x:0,
  y:0, 
  // color:'#996633',
  // img:'wood.png',
  width:70,
  height:10
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
var isFall=false;
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
function checkLakeLimits(dir) {
  var result = true;
  var fireRightX=fire.x+fire.width;  
  c('state','ok',1);
  c('fireRightX',fireRightX,0);
  c('WIDTH',WIDTH,0);
  c('fire.x',fire.x,0);
  
  var lakeRightX=lake.x+lake.width;
  if (dir=='r') {//don't cross x right limit
    if (fire.x> lake.x ) {      
      isFall=true;
      c('isFall',isFall,0);
      
    }
  }  
  else if(dir=='l'){//don't cross x left limit
    if (fire.x<lakeRightX) {
      isFall=true;
      c('isFall',isFall,0);
    }
  } 
  return isFall;
}
function checkBorderLimits(dir) {

  var result = true;
  var fireRightX=fire.x+fire.width;  
  if (dir=='r') { //don't cross x right limit 
    if (fireRightX>WIDTH  ) {
      // c('state','no',0);
      result = false;
    }
  } 
  else if(dir=='l'){ //don't cross x left limit
    if (fire.x<0) {
      // c('state','no',0);
      result = false;
    }
  } 
  return result;
}
    /*c('fire.x',fire.x,1);
    c('fire.width,fire.width,0);
    c('lake.x',lake.x,0);
    c('lake.width',lake.width,0);
    c('isFalling',isFalling,0);
        //detect fall position
        if (fire.x+fire.width>lake.x && fire.x<lake.x+lake.width){ 
          isFalling=true;
          c('isFalling',isFalling,0);
        } */
    /*c('isFalling',isFalling,1);
      //detect fall position
      if (fire.x+fire.width>lake.x || fire.x<lake.x+lake.width){ 
        isFalling=true;
        c('isFalling',isFalling,1);
      }*/
//ACITON
function update(){


  /************ MOVEMENT LIMITS ***************/
  //fire right & left
  if (keys[39]) {
      //Right
      fire.x_velocity += 0.5;
      if(checkBorderLimits('r')){
        fire.x+=fire.turnSpeed;
      } 
      if(checkLakeLimits('r')){
        // c('isFall',true,1);      
      }     
      else{
        // c('isFall',false,1);  
      }
    }
    if (keys[37]) {
      fire.x_velocity -= 0.5;
      //Left
      if(checkBorderLimits('l')){
        fire.x-=fire.turnSpeed;
      }
      if(checkLakeLimits('l')){
        // c('isFall',true,1);     
      }
      else{
        c('isFall',false,1);     
      } 
    }
//fire up & down
// if (controller.up && fire.jumping == false) {
//     fire.y_velocity = 20;
//     fire.jumping = true;
//   }
s(fire.jumping);
if (keys[38] && fire.jumping == false) {
      //up
      s('up');
      fire.y_velocity -= 15;
      fire.jumping = true;
      s(fire.jumping);

      //when press up it will jump
      // jump=true;
      // c("state",'jump');
      
      //jump
      //don't cross y up limits
    //   fire.y_velocity = 20;
    // fire.jumping = true;
      // if (fire.y+fire.height>0)
      //   fire.y-=fire.turnSpeed;
    }//up
    // else {
    //   // down
    //   // c("state",'down');
    //         // c("fire.y",fire.y);
    //         // c("fire.yo",fire.y0)
    //   //don't cross y down limits 
    //   if (fire.y<fire.y0)
    //     fire.y+=fire.turnSpeed;
    // }//down
    if (keys[40]) {
      //down
      s('down');
      
    }//down
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

  c('y_velocity',fire.y_velocity,1);


  fire.y_velocity += 1.5; //gravity
  fire.x += fire.x_velocity;
  fire.y += fire.y_velocity;

  fire.x_velocity *= 0.9 //friction
  fire.y_velocity *= 0.9 //friction

  var ground = land.height-land.height;

  // c1('x',fire.x);
  c('y',fire.y,0);
  c('ground',ground,0);

  // c1('y',fire.y);
  // s(HEIGHT);
  // s(land.height);
  
  // c('ground',ground,0);
  if (fire.y > ground)
  {
      fire.y=ground;
      fire.jumping = false;
      fire.y_velocity=0;
  }
  else{

  }

  

}//fn update

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
  lake.y=land.y-1;
  ctxDrawer.drawImage(lakeImg,lake.x,lake.y,lake.width,lake.height);
  //draw sun
  var sunImg=new Image();
  sunImg.src=sun.img;
  lake.x=(WIDTH/2)-(lake.width/2);
  lake.y=HEIGHT-lake.height-9;
  ctxDrawer.drawImage(sunImg,sun.x,sun.y,sun.width,sun.height);
  //draw wood   
  ctxDrawer.fillStyle=wood.color;
  wood.x=(WIDTH/2)-(wood.width/2);
  wood.y=(HEIGHT/2)-(wood.height/2);
  ctxDrawer.fillRect(wood.x,wood.y,wood.width,wood.height);
  ctxDrawer.fillRect(wood.x,wood.y,wood.width,wood.height);
  
  //draw fire
  var fireImg=new Image();
  fireImg.src=fire.img;
  ctxDrawer.drawImage(fireImg,fire.x,fire.y+HEIGHT-fire.height-land.height+5,fire.width,fire.height);
  score=fire.x+" - "+fire.y+" || "+fire.width+" - "+fire.height+" || "+WIDTH+" - "+HEIGHT;
  //draw score 
  ctxDrawer.font = "7px arial";
// Create gradient
  // Fill with gradient
  ctxDrawer.fillStyle='black';
  ctxDrawer.fillText(info, 10, 10);  
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

var c =function (key,val,p) {
  if (p==1) {
    info=" ..."+key+" : "+val; 
  }else{
    info+=" ..."+key+" : "+val; 
  }
}
var c1 =function (key,val) {
      console.log(key+" : "+val); 
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
