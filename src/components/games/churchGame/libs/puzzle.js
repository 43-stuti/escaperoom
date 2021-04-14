//import { text } from 'express';

const P5 = require('p5');
const script = function(p5) { 
//let images=[];


//let counter1, counter2, counter3, counter4;
console.log("SKETCH IS LOADING ZERO")
 p5.preload = () =>{
    console.log("SKETCH IS LOADING ONE");
  /*images[0] = p5.loadImage('church/assets/briefcase-images/sandwich.png');
  images[1] = p5.loadImage('church/assets/briefcase-images/time.png');
  images[2] = p5.loadImage('church/assets/briefcase-images/danger.png');
  images[3] = p5.loadImage('church/assets/briefcase-images/box.png');
  images[4] = p5.loadImage('church/assets/briefcase-images/tomato.png');
  images[5] = p5.loadImage('church/assets/briefcase-images/wind.png');
  images[6] = p5.loadImage('church/assets/briefcase-images/perfume.png');
  images[7] = p5.loadImage('church/assets/briefcase-images/rat.png');
  images[8] = p5.loadImage('church/assets/briefcase-images/note.png');
  images[9] = p5.loadImage('church/assets/briefcase-images/pizza.png');*/
}

 p5.setup = () => {
  p5.createCanvas(800, 400);
  //p5.rectMode(p5.CENTER);
  //counter1=1;
  //counter2=9;
  //counter3=6;
  //counter4=7;
  p5.text('word', 10, 30);

  console.log("SKETCH IS LOADING TWO")
}

 p5.draw = () => {
  p5.background("black");
  console.log("SKETCH IS LOADING THREE")
  /*if(counter1>9){
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
  
  
  p5.fill("gold");
  p5.rect(400,200,650,200)
  
  p5.fill(186,161,0);
  p5.square(170,200,100);
  p5.square(320,200,100);
  p5.square(470,200,100);
  p5.square(620,200,100);
  
  p5.image(images[counter1],145,175,50,50);
  p5.image(images[counter2],295,175,50,50);
  p5.image(images[counter3],445,175,50,50);
  p5.image(images[counter4],595,175,50,50);*/
}

/*p5.mouseClicked = () =>{
  if(p5.mouseX>120 && p5.mouseX<220 && p5.mouseY>150 && p5.mouseY<250){
    counter1++;
  }
  
  if(p5.mouseX>270 && p5.mouseX<370 && p5.mouseY>150 && p5.mouseY<250){
    counter2--;
  }
  
  if(p5.mouseX>420 && p5.mouseX<520 && p5.mouseY>150 && p5.mouseY<250){
    counter3++;
  }
  
  if(p5.mouseX>570 && p5.mouseX<670 && p5.mouseY>150 && p5.mouseY<250){
    counter4--;
  }
}*/
}

var sketch = function () {
    new P5(script);
}
export default sketch;