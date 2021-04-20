//created for our Escape Room!
//created by Douglas Goldstein, Meena Ko, Stuti Mohgaonkar, and Zack Kampf
//Match the pose in the painting with your body to complete the puzzle

let faceapi;
let video,video2;
let detections;
let pose;
let img;
let youWin;
let mouth_x,mouth_y,mouth2_x,mouth2_y;
let rightWrist, leftWrist;
let a,q,d;
let pose1, pose2;

let poseNet;
let poses = [];

const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
}



function preload() {
  img = loadImage('scream.jpeg');
  
  youWin = loadImage('boo.jpg');
  
  
  

}

function setup() {
  video = createCapture(VIDEO);
  video2 = video;
  createCanvas(1200, 416);
  // load up your video
  
  //video.size(width/2,height/2);
  video.hide(); // Hide the video element, and just show the canvas
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function (results) {
      poses = results;
      if (poses.length > 0) {  
        //console.log("poseNet on");
        pose = poses[0].pose;
    }
    });
  
  
  
  
}




function faceReady() {
    console.log('face API ready!');
    //console.log(faceapi);
    faceapi.detect(gotResults);
  
  }

function modelReady() {
    console.log('poseNet ready!');
    //console.log(poseNet);
  faceapi = ml5.faceApi(video, detection_options, faceReady);
  }

function gotResults(err, result) {
    if (err) {
      console.log(err);
      return
    }
    // console.log(result)
    detections = result;

    if (detections) {
      if (detections.length > 0 ) {
        drawLandmarks(detections);
      }

    }
    faceapi.detect(gotResults);

  }
  
function draw() {
  
  image(video,600,0,320,240);
  
  
  if(pose){
    //console.log("pose ready");
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
     q = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    
    let rightWrist = pose.rightWrist;
    let leftWrist = pose.leftWrist;
    //console.log(leftWrist.y/q);
     a = dist(rightWrist.x,rightWrist.y, mouth_x,mouth_y);
    //console.log(a/q);
    
    if (leftWrist.y/q < 5){
    pose2=true;
      //console.log("pose 2 done");
  }
      
  }
  
  d = int(dist(mouth_x, mouth_y, mouth2_x, mouth2_y));
    // if mouth is open
    if (d > 20 && a/q < 2.5 ) {

      pose1=true;
     // console.log("pose 1 done");
    }
  
  
  
  
  
   if (pose1 && pose2){
     
   image(youWin, 0, 0,600,416);

    } else {
      image(img, 0, 0, 600, 416);
    }
  
}



function drawLandmarks(detections) {

  for (let i = 0; i < detections.length; i++) {

    const mouth = detections[i].parts.mouth;
  

     mouth_x = int(mouth[3]._x);
     mouth_y = int(mouth[3]._y);

     mouth2_x = int(mouth[9]._x);
     mouth2_y = int(mouth[9]._y);

    
  
    
  }
}






