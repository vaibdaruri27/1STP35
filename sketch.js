//Create variables here
var dog1, dog2;
var dog, happyDog, database, foodS, foodStock;

var feedPet, addFood;
var fedTime, lastFed;
var foodObj;

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

  // foodStock = database.ref('Food');
  // foodStock.on("value", function readStock1(data){
  //    foodS = data.val();
  // })

  foodObj = new Food();
  feedPet = createButton("Feed the dog!");
  feedPet.position(500,95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

}


function draw() {  
  background(rgb(46,139,87));

  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.visible = false;
  //   happyDog.addImage(dog2);
  //   happyDog.scale = 0.3;
  // }

  drawSprites();
  
  // textFont("Arial Black")
  // textSize(15);
  // fill("blue");
  // text("Note: Press UP_ARROW Key to feed your very own...DOG!", 20,40);

  //add styles here
  foodObj.display();
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last feed: " + lastFed%12+"PM",350,30);
  } else if(lastFed==0) {
    text("Last feed: 12 AM", 350, 30);
  } else {
    text("Last Feed: " + lastFed + "AM" ,350,30);
  }

}



function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.visible = false;
  happyDog.addImage(dog2);
  happyDog.scale = 0.3;
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

}


