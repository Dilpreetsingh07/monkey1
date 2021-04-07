var backImage,backgr;
var player, player_running;
var fruitsGroup, ground,ground_img;
var obstaclesGroup;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimg=loadImage("banana.png")
  obstacleimg=loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  fruitsGroup = new Group();
  obstaclesGroup=new Group();
  score = 0;
  
}

function draw() { 
  background(backImage);
  drawSprites();
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Score: "+ score, 100,50);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
   
  }
  spawnfruits()
  spawnObstacles()
  if(fruitsGroup.isTouching(player)){
       
    score = score+1;
    player.scale+= +0.1
    fruitsGroup.destroyEach();
    
   }
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    if(obstaclesGroup.isTouching(player)){
       
      gameState = END;
   
  }

  }
 
else if(gameState == END){
  backgr.velocityX=0
  player.visible=false;

  fruitsGroup.destroyEach();
  obstaclesGroup.destroyEach();

  textSize(30);
  fill(255);
  text("GAME OVER !",300,220)
}

  
}
function spawnfruits(){
  if(frameCount % 80 === 0){
    var banana=createSprite(650,200,40,10);
    banana.y=random(120,200);
    banana.addImage("fruit",bananaimg)
    banana.scale=0.05
    banana.velocityX=-4;
    banana.lifetime=300
    player.depth=banana.depth+1
    fruitsGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstacleimg);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
