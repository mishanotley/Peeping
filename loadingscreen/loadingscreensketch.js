var pic;
var mask;
let button;
let value = 0;
let rectposx = 150;
let rectposy = 150;
let squareWidthAndHeight = 80;
let lightimg;
let myFont;

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  lightimg = loadImage('1422354.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  pic = loadImage("titlescreen.png");
  mask = loadImage("newmask.png");
} 

function draw() {
  background(0);
  blendMode(LIGHTEST);
  imageMode(CENTER);
  image(mask,mouseX,mouseY,mask.width,mask.height);
   
  blendMode(DARKEST);
  imageMode(CORNER);
  image(pic,0,0);
  rect(rectposx, rectposy, squareWidthAndHeight, squareWidthAndHeight);
  
  textSize(14);
  text('Enter Site',rectposx-2, rectposy+80);
  stroke(50);
  strokeWeight(0.5);
  image(lightimg, rectposx, rectposy, squareWidthAndHeight, squareWidthAndHeight);
}

function mouseClicked() {
    if (mouseX > rectposx && mouseX < (rectposx + squareWidthAndHeight) && mouseY > rectposy && mouseY < (rectposy + squareWidthAndHeight)){
      console.log('clicked');
    window.open("../Pages/index.html");
  }else{
    value = 0;
  }
}