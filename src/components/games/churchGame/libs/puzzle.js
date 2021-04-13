//import p5 from "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.2.0/p5.js";
//import p5Sound from "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.2.0/addons/p5.sound.min.js";

let images=[];

let counter1, counter2, counter3, counter4;

function preload(){
  images[0] = loadImage('./assets/church/briefcase-images/sandwich.png');
  images[1] = loadImage('./assets/church/briefcase-images/time.png');
  images[2] = loadImage('./assets/church/briefcase-images/head.png');
  images[3] = loadImage('./assets/church/briefcase-images/box.png');
  images[4] = loadImage('./assets/church/briefcase-images/tomato.png');
  images[5] = loadImage('./assets/church/briefcase-images/wind.png');
  images[6] = loadImage('./assets/church/briefcase-images/perfume.png');
  images[7] = loadImage('./assets/church/briefcase-images/rat.png');
  images[8] = loadImage('./assets/church/briefcase-images/note.png');
  images[9] = loadImage('./assets/church/briefcase-images/pizza.png');
}

function setup() {
  createCanvas(800, 400);
  rectMode(CENTER);
  counter1=1;
  counter2=9;
  counter3=6;
  counter4=7;
}

function draw() {
  background("black");
  if(counter1>9){
    counter1=0;
  }
  if(counter2<0){
    counter2=9;
  }
  if(counter3>9){
    counter3=0;
  }
  if(counter4<0){
    counter4=9;
  }
  
  
  fill("gold");
  rect(400,200,650,200)
  
  fill(186,161,0);
  square(170,200,100);
  square(320,200,100);
  square(470,200,100);
  square(620,200,100);
  
  image(images[counter1],145,175,50,50);
  image(images[counter2],295,175,50,50);
  image(images[counter3],445,175,50,50);
  image(images[counter4],595,175,50,50);
}

function mouseClicked(){
  if(mouseX>120 && mouseX<220 && mouseY>150 && mouseY<250){
    counter1++;
  }
  
  if(mouseX>270 && mouseX<370 && mouseY>150 && mouseY<250){
    counter2--;
  }
  
  if(mouseX>420 && mouseX<520 && mouseY>150 && mouseY<250){
    counter3++;
  }
  
  if(mouseX>570 && mouseX<670 && mouseY>150 && mouseY<250){
    counter4--;
  }
}