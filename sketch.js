//Create variables here
var dogImage, happyDog, database, foodS, foodStock;
var feedPetButton, addFoodButton;
var fedTime, lastFed;
var foodObj;


function preload()
{

  dogImage = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  background(46, 139, 87);
  
  dog = createSprite(250,350,50,50);
  dog.addImage(dogImage);
  dog.scale=0.1;

  foodObj = new Food();

  database=firebase.database();
    
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  lastFed=data.val();

  feedPetButton = createButton("Feed Pet")

  addFoodButton = createButton("Add Food")
}


function draw() {
  background(46, 139, 87)  
  
  drawSprites();
  //add styles here

  textSize(20);  
  text("Food Remaining:"+ foodS, 150, 200);

  if(lastFed>=112){
    text("Last Fed : "+lastFed%12 + "PM", 350,30);
  }elseIf(lastFed===0){
    text("Last Fed : 12AM", 350,30);
  }else{
    text("Last Fed : "+ lastFed + "AM",350,30);
  }

  foodObj.display();
}


function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}




