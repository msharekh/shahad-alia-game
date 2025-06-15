// VARIABILESF
var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');
var running = true;
var finished = false;
var score = 0;
var isCollision;
var WIDTH = 300;
var HEIGHT = 150;
var keys = [];
var isJumping = false;
var speedJump = 20;
var g = 9.8;
var isFalling = false;
var margin=0.8;
//OBJECTS
var sky = {
  x: 0,
  y: 0,
  color: '#6495ED',
  width: WIDTH,
  height: HEIGHT - 40
};
var land = {
  x: 0,
  y: HEIGHT - 40,
  color: '#996633',
  width: WIDTH,
  height: 40
};
var lake = {
  x: 60,
  y: HEIGHT - 41,
  img: 'lake.png',
  width: 170,
  height: 40
};
var sun = {
  x: WIDTH - 60,
  y: 5,
  img: 'sun.png',
  width: 60,
  height: 40
};
var wood = {
  x: 110,
  y: HEIGHT / 2,
  // color:'#996633',
  // img:'wood.png',
  width: 70,
  height: 10
};

//fire defintion
var fire = {
  // x0:10,
  x: 0,
  // y0:0,
  y: sky.height - 30,
  img: 'fire.png',
  width: 30,
  height: 30,
  jumping: true,
  x_velocity: 0,
  y_velocity: 0
};

var lable = {
  x: 10,
  y: 10,
  font: "11px Verdana arial"
};
// var Ruler=function () {
//   this.x=0;
//   this.y=0;
//   this.color='black';
//   this.width=1;
//   this.height=0;
// }



//left and right by KEYS LISTENTERS
window.onkeydown = function (e) {
  keys[e.keyCode] = true;
}
window.onkeyup = function (e) {
  delete keys[e.keyCode];

}
function currentTime() {
  var date = new Date();
  return date;
}
//GAME
function run() {
  update();
  render();
}
var jump = false;
var velocityY = 10;
var jumpHeightSquared = 16;
var gravityAccelerationY = 10;
var time = 2;
var isFall = false;
var info = '';

var ground_y;

var L_lake;
var R_lake;
var L_wood;
var R_wood;

var L_fire;
var R_fire;
var T_fire;
var B_fire;


//ACITON
function update() {
  /************ MOVEMENT LIMITS ***************/




  L_lake = parseInt(lake.x);
  R_lake = parseInt(lake.x) + parseInt(lake.width);

  L_wood = parseInt(wood.x);
  R_wood = parseInt(wood.x) + parseInt(wood.width);

  c1('wood', L_wood + " | " + R_wood, 1);
  // c('wood l | wood r',wood.x +" | "+ parseInt(wood.x+wood.width));

  L_fire = parseInt(fire.x);
  R_fire = parseInt(fire.x) + parseInt(fire.width);
  T_fire = parseInt(fire.y);
  B_fire = parseInt(fire.y) + parseInt(fire.height);

  // c('fire',L_fire +" | "+ R_fire);

  // c('lake l | lake r',lake.x +" | "+ parseInt(lake.x+lake.width));
  // c('wood l | wood r',wood.x +" | "+ parseInt(wood.x+wood.width));


  // ... above land
  if (L_fire < L_wood-(margin*fire.width) || R_fire > R_wood+(margin*fire.width)) {
    ground_y = sky.height - fire.height;

    // c('above land',ground_y);


  }
  

  //... above wood
  if (
    B_fire < wood.y
    && R_fire > L_wood
    && L_fire < R_wood
    //  ||
    // B_fire<wood.y 
    // && L_fire>R_wood
  ) {
    c('above wood', fire.y);
    c1('fire', L_fire + " | " + R_fire, 0);
    ground_y = wood.y - fire.height;

  }
  // else{
  // ground_y = sky.height-fire.height;
  // }


  c1("ground_y", ground_y, 1)


  //------#### Right ####------
  if (keys[39]) {
    // c('right',fire.x);

    //... R edge
    if (fire.x < WIDTH - fire.width + 1) {

      fire.x_velocity += 1;
      fire.x += fire.x_velocity;
    }


  }// Right

  //------#### Left ####------
  if (keys[37]) {
    // c('left',fire.x);

    //...L edge
    if (fire.x > 1) {

      fire.x_velocity += 1;
      fire.x -= fire.x_velocity;
    }

  }// Left

  //------#### Up ####------
  //work when ..... jumbing=false
  if (keys[38] && fire.jumping == false) {
    fire.y_velocity -= 15.5;
    fire.jumping = true;
    // s(fire.jumping);
  }//up


  //------#### Down ####------
  if (keys[40]) {
    // ('down');

  }//down
  //c('y_velocity',fire.y_velocity);
  //c('x_velocity',fire.x_velocity);
  // c('fire.y',fire.y);
  // c('wood.y',wood.y);
  // c('sky.height',sky.height);

  fire.y_velocity += 1.5; //gravity 
  fire.y += fire.y_velocity;

  fire.x_velocity *= 0.9 //friction
  fire.y_velocity *= 0.9 //friction





  // if (R_fire>L_wood || L_fire>R_wood) {

  //   ground_y = wood.y-fire.height;

  //   c1('fire',L_fire +" | "+ R_fire,0);

  //   c('above wood',ground_y);
  // }


  //c1('fire',L_fire +" | "+ R_fire,0);

  //------#### Gravity ####------
  if (fire.y > ground_y) {
    fire.y = ground_y;
    fire.jumping = false;
    fire.y_velocity = 0;
  }
  // ... enter water
  //   if ( fire.x+fire.width>lake.x 
  //       || fire.x<lake.x+lake.width) {
  //     ground_y=HEIGHT-30;
  //     // c('enter water',ground_y);




  // }else{
  // // ... off wood
  //   c('off wood',ground_y);

  // }
  // c('y',fire.y);
  // c('ground',ground);




}//fn update
//DRAWING
function render() {
  //clear
  //frame
  ctx.fillStyle = 'black';
  ctx.strokeRect(0, 0, WIDTH, HEIGHT);
  //sky
  ctx.fillStyle = sky.color;
  ctx.fillRect(sky.x, sky.y, sky.width, sky.height);
  //draw land
  ctx.fillStyle = land.color;
  // land.y=HEIGHT-land.height;
  ctx.fillRect(land.x, land.y, land.width, land.height);
  ctx.fillText(land.y, land.x, land.y);

  //draw lake
  var lakeImg = new Image();
  lakeImg.src = lake.img;
  // lake.x=(WIDTH/2)-(lake.width/2);
  // lake.y=land.y-1;
  ctx.drawImage(lakeImg, lake.x, lake.y, lake.width, lake.height);
  //draw sun
  var sunImg = new Image();
  sunImg.src = sun.img;

  // lake.x=(WIDTH/2)-(lake.width/2);
  // lake.y=HEIGHT-lake.height-9;
  ctx.drawImage(sunImg, sun.x, sun.y, sun.width, sun.height);

  //draw wood   
  ctx.fillStyle = wood.color;
  //wood.x=(WIDTH/2)-(wood.width/2);
  // wood.y=(HEIGHT/2)-(wood.height/2);
  ctx.fillRect(wood.x, wood.y, wood.width, wood.height);
  ctx.fillText(wood.y, wood.x, wood.y);

  //draw fire
  var fireImg = new Image();
  fireImg.src = fire.img;
  ctx.drawImage(fireImg, fire.x, fire.y, fire.width, fire.height);
  score = fire.x + " - " + fire.y + " || " + fire.width + " - " + fire.height + " || " + WIDTH + " - " + HEIGHT;
  //draw lable 
  ctx.font = lable.font;
  ctx.fillStyle = 'black';
  ctx.fillText(info, lable.x, lable.y);


  //draw rulers
  var rulers = [];

  //rulers.push({x:180,y:30,width:1,height:100});
  //rulers.push({x:wood.x,y:30,width:1,height:100});
  // rulers.push({x:0,y:wood.y,width:WIDTH,height:1});
  rulers.push({ x: 0, y: fire.y + fire.height, width: WIDTH, height: 1 });

  for (var i = 0; i < rulers.length; i++) {
    ctx.fillStyle = rulers[i].color;
    ctx.fillRect(rulers[i].x, rulers[i].y, rulers[i].width, rulers[i].height);
    ctx.fillText(fire.x + ":" + fire.y, WIDTH - 35, rulers[i].y - 5);

  }

}
//FUNTIONS
function resetGame() {
  score = 0;
  finished = false;
  //sound    
  var snd = new Audio("sound1.wav"); // buffers automatically when created
  snd.play();
  //running=true;
}
function s(x) {
  console.log(x);
}
var c1 = function (key, val, p) {
  if (p == 1) {
    info = key + " : " + val;
  } else {
    info += " ..." + key + " : " + val;
  }
}
var c = function (key, val) {
  console.log(key + " : " + val);
}
//LIFE
setInterval(function () {
  //while(running)  
  if (running && !finished) {
    run();
  }
  if (finished) {
    //end game
    resetGame();
  }
}, 100);
 /****** Test-Driven Development (TDD) *****/
//TDD
/****** Test-Driven Development (TDD) *****/
