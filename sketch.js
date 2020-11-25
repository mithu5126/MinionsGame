var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartImg;
var minions, minionsImage, minions_collided;
var ground, groundImg;
var invisibleGround;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var score ;

function preload(){
minionsImage = loadAnimation("4.png","5.png","6.png","7.png","8.png","9.png","10.png","12.png");
minions_collided = loadAnimation("4.png");
  
obstacle1 = loadImage("purpleminion.png");
obstacle2 = loadImage("scarletOverkill.png") ; 
obstacle3 = loadImage("d2.png");
restartImg = loadImage("restart.png");
  groundImg = loadImage("ground.png");
  
}

function setup() {
 createCanvas(windowWidth, windowHeight);
 
  minions = createSprite(140,height-100,20,20);
  minions.addAnimation("moving", minionsImage);
minions.addAnimation("collided",minions_collided)
  
  ground = createSprite(width/2,height-10,width+900,40);
 ground.x=ground.width/2;
  
  
 
 
 
  
    restart = createSprite(300,300);
  restart.addImage(restartImg);
  restart.scale=0.1;
  
   obstaclesGroup = createGroup(); 
  
  score = 0;
}

function draw() {
background("white");
fill(0);
textSize(20);
text("Score : "+ score,500,50);
  
  if(gameState === PLAY){
  restart.visible=false;
    
   ground.velocityX=-(4 + 3* score/100);
    
    
    if((touches.length > 0 || keyDown("SPACE")) && minions.y >= 
       height-340){
      
  minions.velocityY= -10  ;  
  touches = [] ;   
      
    }
    
    minions.velocityY = minions.velocityY + 0.4 ;   
    
   
    if(ground.x < 0){
      ground.x=ground.width/2;   
       }

  
   score = score + Math.round(getFrameRate()/60);
    
    
  spawnVillians() ; 
    if(obstaclesGroup.isTouching(minions)){
  ; 
        gameState = END;
   }   
}
 else if(gameState === END) {
   restart.visible = true; 
   
   minions.changeAnimation("collided",minions_collided)
   
   if(mousePressedOver(restart)) {
      reset();
 }
   
ground.velocityX = 0;
minions.velocityY = 0;
   
obstaclesGroup.setLifetimeEach(-1);   
   
   
 } 
  
 minions.collide(ground) ;
drawSprites() ;   
  }
  
 
function spawnVillians(){
  if (frameCount % 160 === 0){
   var obstacle = createSprite(600,height-128,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  
  
  }
  
}

function reset(){
 gameState = PLAY; 

restart.visible=false;
  
obstaclesGroup.destroyEach();

  
 minions.changeAnimation("moving", minionsImage) ;
 
  score=0;
}
