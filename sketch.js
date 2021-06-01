var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleBlockGroup;
var gameState = "play";
var sound;



function preload()
{
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  sound = loadSound("spooky.wav");
}

function setup()
{
  createCanvas(600,600);
  
  sound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImage);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}


function draw()
{
  background("black");
  
  if (gameState === "play")
    {
  if(tower.y>400)
    {
      tower.y = 300;
    }
  
  if(ghost.isTouching(climberGroup))
    {
      ghost.velocityY = 0;
    }
  
  if(ghost.y>600 || ghost.isTouching(invisibleBlockGroup))
    {
      gameState ="end";
      ghost.destroy();
      
    }
  
  ghost.velocityY = ghost.velocityY + 0.9;
  
  if(keyDown("space"))
    {
      ghost.velocityY = -10;
    }
  
  if(keyDown("right"))
    {
      ghost.x = ghost.x+5;
    }
  
  if(keyDown("left"))
    {
      ghost.x = ghost.x-5;
    }
  
  spawnDoors();
    
  
  drawSprites();
 }
  
  if(gameState ==="end")
    {
      stroke("blue");
      fill("yellow");
      textSize(30);
      text("Game is over",200,300);
    }
  
}

function spawnDoors()
{
  if(frameCount%240 === 0)
    {
      door = createSprite(random(140,400),50);
      door.addImage("door",doorImage);
      door.velocityY = 1;
      door.lifetime = 620;
      doorGroup.add(door);
      climber = createSprite(door.x,110)
      climber.addImage("climber",climberImage);
      climber.velocityY = 1;
      climber.lifetime = 620;
      climberGroup.add(climber);
      ghost.depth = door.depth;
      ghost.depth += 1;
      invisibleBlock = createSprite(door.x,115,climber.width,2);
      invisibleBlock.velocityY = 1;
      invisibleBlock.debug = true;
      invisibleBlockGroup.add(invisibleBlock);
      
    }
  
}







