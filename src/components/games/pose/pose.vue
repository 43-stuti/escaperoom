<template>
 <v-container fluid fill-width fill-height class="container border">
    <div id="p5Canvas"></div>
  </v-container>
</template>

<script>
import ml5 from 'ml5'
export default {
  name: 'pose',
  data () {
    return {
        faceapi:null,
        video:null,
        video2:null,
        detections:null,
        pose:null,
        img:null,
        youWin:null,
        mouth_x:null,
        mouth_y:null,
        mouth2_x:null,
        mouth2_y:null,
        rightWrist:null,
        leftWrist:null,
        eyeR:null,
        eyeL:null,
        a:null,
        q:null,
        d:null,
        pose1:null, 
        pose2:null,
        poseNet:null,
        poses : [],
        detection_options : {
            withLandmarks: true,
            withDescriptors: false,
        },
        gameState:0,
        p5 : require('p5')
    }
  },
  props:{
  },
  components:{
  },
  methods:{
    faceReady() {
        console.log('face API ready!');
        //console.log(faceapi);
        this.faceapi.detect(this.gotResults);
    },
    modelReady() {
        console.log("posenet ready");
        this.faceapi = ml5.faceApi(this.video, this.detection_options, this.faceReady);
    },
    gotResults(err, result) {
        if (err) {
        console.log(err);
        return
        }
        // console.log(result)
        this.detections = result;

        if (this.detections) {
        if (this.detections.length > 0 ) {
            this.drawLandmarks(this.detections);
        }

        }
        this.faceapi.detect(this.gotResults);

    },
    drawLandmarks(detections) {
        for (let i = 0; i < detections.length; i++) {
            const mouth = detections[i].parts.mouth;
            this.mouth_x = parseInt(mouth[3]._x);
            this.mouth_y = parseInt(mouth[3]._y);
            this.mouth2_x = parseInt(mouth[9]._x);
            this.mouth2_y = parseInt(mouth[9]._y);
        }
    }

  },
  computed: {
        socket() {
            return this.$store.state.socket;
        }
  },
  mounted() {
    this.socket.socket.on('pose-update',(data) => {
        if(data.gameState) {
            this.gameState = data.gameState;
        }
    })
    const script = (p5) => {
        p5.preload = () => {
        this.img = p5.loadImage('/pose/family.png');
        this.youWin = p5.loadImage('/pose/youwin.jpg');
        }
        p5.setup = () => {
            this.video = p5.createCapture(p5.VIDEO);
            
            //p5.createCanvas(1200, 416);
            var canvas = p5.createCanvas(1200, 500)
            canvas.parent("p5Canvas");
            // load up your video
            
            //video.size(width/2,height/2);
            this.video.hide(); // Hide the video element, and just show the canvas
            this.poseNet = ml5.poseNet(this.video, this.modelReady);
            this.poseNet.on('pose',  (results) => {
                this.poses = results;
                if (this.poses.length > 0) {  
                    this.pose = this.poses[0].pose;
                }
            });
        }
        p5.draw = () => {
            p5.image(this.video,600,0,320,240);
            if(this.pose){
                //console.log("posenet detecting");
                 this.eyeR = this.pose.rightEye;
                 this.eyeL = this.pose.leftEye;
                this.q = p5.dist(this.eyeR.x, this.eyeR.y, this.eyeL.x, this.eyeL.y);
                
                 this.rightWrist = this.pose.rightWrist;
                 this.leftWrist = this.pose.leftWrist;
                //console.log(leftWrist.y/q);
                this.a = p5.dist(this.rightWrist.x,this.rightWrist.y, this.mouth_x,this.mouth_y);
                //console.log(this.a/this.q);
                
                if ((this.leftWrist.y/this.q > 6 && this.leftWrist.y/this.q <9) && (this.rightWrist.y/this.q > 6 && this.rightWrist.y/this.q<9) && (this.d > 35)){
                this.pose2=true;
                console.log("pose 2 done");
                }
                this.d = parseInt(p5.dist(this.mouth_x, this.mouth_y, this.mouth2_x, this.mouth2_y));
                if (this.mouth_x/this.q>7 && this.rightWrist.x/this.q<4 && this.d/this.q<25){

                this.pose1=true;
                console.log("pose 1 done");
            }
            }
            
                
            if (this.pose1 && this.pose2){
                if(!this.gameState) {
                    this.gameState = 1;
                }
                p5.image(this.youWin, 0, 0,600,416);
            } else {
                p5.image(this.img, 0, 0, 600, 416);
            }
            if(this.gameState == 1) {
                this.socket.socket.emit('diary-puzzle',{
                    gameState:1
                });
                this.gameState = 2;
            }
        }
    }
    new this.p5(script)
  }
}
</script>

<style>
#background {
    background-color: #ffffff;
}
</style>
