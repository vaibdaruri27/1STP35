//Create variables here
var dog1, dog2;
var dog, happyDog, database, foodS, foodStock;


function preload()
{
  dog1 = loadImage("images/dogImg.png");
  dog2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250,20,20);
  dog.addImage(dog1);
  dog.scale = 0.3;

  happyDog = createSprite(300,300,30,30);

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", function readStock1(data){
     foodS = data.val();
  })
  
}


function draw() {  
  background(rgb(46,139,87));

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.visible = false;
    happyDog.addImage(dog2);
    happyDog.scale = 0.3;
  }

  drawSprites();
  
  textFont("Arial Black")
  textSize(15);
  fill("blue");
  text("Note: Press UP_ARROW Key to feed your very own...DOG!", 20,40);

  //add styles here
  
}

function writeStock(x){
   if(x<=0){
     x=0;
   }else{
     x = x-1;
   }

   database.ref('/').update({
     Food:x
   })
}



