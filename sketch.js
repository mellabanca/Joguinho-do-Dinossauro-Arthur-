var trex, trex_running, morreu;
var ground, invisibleGround, groundImage;
var nuvem, imagem, grupodenuvens;
var obs1,obs2,obs3,obs4,obs5,obs6, grupodeobs;
var dinodomau, dinodomauimg, dinodomaugrupo;

var score;

var JOGAR = 1;
var ENCERRAR = 0;
var estado = JOGAR;

var gameover, reset, gameoverimg, resetimg;
var sompulo,sommorte,somponto;

var mensagem = "Isso é uma mensagem";

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  morreu = loadAnimation("trex_collided.png");

  dinodomauimg=loadImage("DinoDoMau.png");

  groundImage = loadImage("ground2.png");
  
 imagem=loadImage("cloud.png");
 obs1=loadImage("obstacle1.png");
 obs2=loadImage("obstacle2.png");
 obs3=loadImage("obstacle3.png");
 obs4=loadImage("obstacle4.png");
 obs5=loadImage("obstacle5.png");
 obs6=loadImage("obstacle6.png");

 gameoverimg = loadImage("gameOver.png");
 resetimg = loadImage("restart.png");
 sompulo=loadSound("jump.mp3");
 sommorte=loadSound("die.mp3");
 somponto=loadSound("checkPoint.mp3");
}

function setup() {

  createCanvas(600,200)
  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

    //crie um sprite de trex
  trex = createSprite(50,120,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("morreu",morreu);
  trex.scale = 0.5;
  
  

  gameover = createSprite(300,100);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;

  reset = createSprite(300,140);
  reset.addImage(resetimg);
  reset.scale = 0.5;
  
  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  grupodeobs = new Group();
  grupodenuvens = new Group();
  dinodomaugrupo = new Group();

  score = 0;

  //gerar números aleatórios
  var rand =  Math.round(random(1,100))
  console.log(rand)

  trex.setCollider("circle",0,0,40);
  //trex.debug = true;

}

function draw() {
  //definir cor do plano de fundo
  background("#cc9600");

 // console.log(mensagem);
  
//console.log("Estado="+estado);

  //console.log(trex.y)
  
  fill("black");
  text("Pontuação:"+score, 500,40);

if(estado === JOGAR){
    gameover.visible = false;
    reset.visible = false;
    ground.velocityX = -(4+score/100);
    score = score + Math.round(frameRate()/60);
if(score>0&&score%160===0){
  somponto.play();
}   
if (ground.x < 0){
      ground.x = ground.width/2;
    }
    // pulando o trex ao pressionar a tecla de espaço
if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
    sompulo.play();
  }

  trex.velocityY = trex.velocityY + 0.8;

    //Gerar Nuvens
    spawnClouds();
    dino();
    obistaculo();


if(grupodeobs.isTouching(trex) || dinodomaugrupo.isTouching(trex)){
      estado = ENCERRAR;
      sommorte.play();
      gameover.visible = true;
      reset.visible = true;
    }

  }else if (estado === ENCERRAR){
    trex.changeAnimation("morreu",morreu);

    grupodeobs.setLifetimeEach(-1);
    grupodenuvens.setLifetimeEach(-1);
    dinodomaugrupo.setLifetimeEach(-1);

    ground.velocityX = 0;
    trex.velocityY = 0;
  
    grupodeobs.setVelocityXEach(0);
    grupodenuvens.setVelocityXEach(0);
    dinodomaugrupo.setVelocityXEach(0);
  }
//impedir que o trex caia
trex.collide(invisibleGround);

if(mousePressedOver(reset)){
  resetar();
}

  drawSprites();
}

function resetar(){
  estado = JOGAR;
  gameover.visible = false;
  reset.visible = false;

  grupodeobs.destroyEach();
  grupodenuvens.destroyEach();
  dinodomaugrupo.destroyEach();

  score = 0;

  trex.changeAnimation("running", trex_running);
}

//função para gerar as nuvens
function spawnClouds(){
 if(frameCount % 60 === 0){
 nuvem=createSprite(600,100,40,10);
 nuvem.addImage(imagem);
 nuvem.y= Math.round(random(10,100));
 nuvem.velocityX=-3;
 nuvem.depth=trex.depth;
 trex.depth=trex.depth+1;

 grupodenuvens.add(nuvem);

 nuvem.lifetime = 250;
 }
}
 function dino(){
    if(frameCount % 100 === 0){
  dinodomau=createSprite(600,100,40,10);
  dinodomau.addImage(dinodomauimg);
  dinodomau.y= Math.round(random(80,150));
  dinodomau.velocityX=-3;
  
  dinodomaugrupo.add(dinodomau);
 
  dinodomau.lifetime = 250;
  }
}

function obistaculo(){
 if(frameCount % 60 === 0){
 var obs=createSprite(600,165,10,40);
 obs.velocityX=-(6+score/100);
 var obss= Math.round(random(1,6));
   switch (obss) {
   case 1:obs.addImage(obs1);
   break;
   case 2:obs.addImage(obs2);
   break;
   case 3:obs.addImage(obs3);
   break;
   case 4:obs.addImage(obs4);
   break;
   case 5:obs.addImage(obs5);
   break;
   case 6:obs.addImage(obs6);
   break;
   default:
   break;
 }
 obs.scale=0.5;
 obs.lifetime=300;

 grupodeobs.add(obs);
 }
}