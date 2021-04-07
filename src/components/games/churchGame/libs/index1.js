/*
 *
 * This uses code from a THREE.js Multiplayer boilerplate made by Or Fleisher:
 * https://github.com/juniorxsound/THREE.Multiplayer
 * And a WEBRTC chat app made by Mikołaj Wargowski:
 * https://github.com/Miczeq22/simple-chat-app
 *
 * Aidan Nelson, April 2020
 *
 */



// socket.io
class IndexSetup {
  constructor(socket,scene) {
    // Variable to store our three.js scene:
    this.glScene = scene;
    this.socket = socket;
    // WebRTC Variables:
    const { RTCPeerConnection, RTCSessionDescription } = window;
    this.RTCPeerConnection = RTCPeerConnection;
    this.RTCSessionDescription = RTCSessionDescription;
    this.iceServerList;

    // set video width / height / framerate here:
    this.videoWidth = 80;
    this.videoHeight = 60;
    this.videoFrameRate = 15;

    // Our local media stream (i.e. webcam and microphone stream)
    // Constraints for our local audio/video stream
    this.mediaConstraints = {
      audio: true,
      video: {
        width: this.videoWidth,
        height: this.videoHeight,
        frameRate: this.videoFrameRate,
      },
    };
    console.log("Window loaded.");
    this.setup();
    // first get user media
    
  }
  setup = async () => {
    this.localMediaStream = await this.getMedia(this.mediaConstraints);
    this.createLocalVideoElement();
    // then initialize socket connection
    this.initSocketConnection(this.socket);
    // finally create the threejs scene
    console.log("Creating three.js scene...");
  }
  initSocketConnection =  ()=> {
    for (let i = 0; i < Object.keys(this.socket.clients).length; i++) {
      if (Object.keys(this.socket.clients)[i] != this.socket.id) {
        this.addClient(Object.keys(this.socket.clients)[i]);
        this.callUser(Object.keys(this.socket.clients)[i]);
      }
    }
  
    // when a new user has entered the server
    /*this.addClient(_id);
    //on disconnect
    console.log(_ids);
    if (_id != this.socket.id) {
      console.log("A user disconnected with the id: " + _id);
      this.glScene.removeClient(_id);
      this.removeClientVideoElementAndCanvas(_id); 
      delete this.socket.clients[_id];
    }*/
    // Update when one of the users moves in space
    this.socket.socket.on("userPositions", (_clientProps) => {
      //console.log('what is it',_clientProps)
      this.glScene.updateClientPositions(_clientProps);
    });
  
    this.socket.socket.on("call-made", async (data) => {
      console.log("Receiving call from user " + data.socket);
      // set remote session description to incoming offer
      await this.socket.clients[data.socket].peerConnection.setRemoteDescription(
        new this.RTCSessionDescription(data.offer)
      );
  
      // create answer and set local session description to that answer
      const answer = await this.socket.clients[data.socket].peerConnection.createAnswer();
      await this.socket.clients[data.socket].peerConnection.setLocalDescription(
        new this.RTCSessionDescription(answer)
      );
  
      // send answer out to caller
      this.socket.socket.emit("make-answer", {
        answer,
        to: data.socket,
      });
    });
  
    /*socket.on("pose-puzzle", (data) =>{
      posePuzzle1=data;
      console.log(posePuzzle1);
  
  
    })*/
  
    this.socket.socket.on("answer-made", async (data) => {
      console.log("Answer made by " + data.socket);
      // set the remote description to be the incoming answer
        await this.socket.clients[data.socket].peerConnection.setRemoteDescription(
        new this.RTCSessionDescription(data.answer)
      );
  
      // what is this for?
      if (!this.socket.clients[data.socket].isAlreadyCalling) {
        this.callUser(data.socket);
        this.socket.clients[data.socket].isAlreadyCalling = true;
      }
    });
    
    this.socket.socket.on("iceCandidateFound", (data) => {
      console.log('ICE WHAT',this.socket.clients,this.socket.clients[data.socket],data.socket);
      this.socket.clients[data.socket].peerConnection.addIceCandidate(data.candidate);
    });
  }
  addClient = (_id) => {
    // add peerConnection to the client
    let pc = this.createPeerConnection(_id);
    console.log('BAAAH',this.socket.clients,_id,this.socket.clients[_id])
    this.socket.clients[_id].peerConnection = pc;
  
    // boolean for establishing WebRTC connection
    this.socket.clients[_id].isAlreadyCalling = false;
  
    // create video element:
    this.createClientMediaElements(_id);
  
    // add client to scene:
    console.log('ADDD CLIENT')
    this.glScene.addClient(_id);
  }
  callUser = async (id) => {
    if (this.socket.clients[id]) {
      console.log("Calling user " + id);
  
      // https://blog.carbonfive.com/2014/10/16/webrtc-made-simple/
      // create offer with session description
      const offer = await this.socket.clients[id].peerConnection.createOffer();
      await this.socket.clients[id].peerConnection.setLocalDescription(
        new this.RTCSessionDescription(offer)
      );
  
      this.socket.socket.emit("call-user", {
        offer,
        to: id,
      });
    }
  }
  createPeerConnection = (_id) => {
    // create a peer connection for  client:
    let peerConnectionConfiguration;
    // if (false) {
    peerConnectionConfiguration = { iceServers: this.iceServerList };
    // } else {
    // peerConnectionConfiguration = {}; // this should work locally
    // }
  
    let pc = new this.RTCPeerConnection(peerConnectionConfiguration);
  
    // add ontrack listener for peer connection
    pc.ontrack = function ({ streams: [_remoteStream] }) {
      console.log("OnTrack: track added to RTC Peer Connection.");
      console.log(_remoteStream);
      // Split incoming stream into two streams: audio for THREE.PositionalAudio and
      // video for <video> element --> <canvas> --> videoTexture --> videoMaterial for THREE.js
      // https://stackoverflow.com/questions/50984531/threejs-positional-audio-with-webrtc-streams-produces-no-sound
  
      let videoStream = new MediaStream([_remoteStream.getVideoTracks()[0]]);
      let audioStream = new MediaStream([_remoteStream.getAudioTracks()[0]]);
  
      // get access to the audio element:
      let audioEl = document.getElementById(_id + "_audio");
      if (audioEl) {
        audioEl.srcObject = audioStream;
      }
      // audio element should start playing as soon as data is loaded
  
      const remoteVideoElement = document.getElementById(_id + "_video");
      if (remoteVideoElement) {
        remoteVideoElement.srcObject = videoStream;
      } else {
        console.warn("No video element found for ID: " + _id);
      }
    };
  
    // https://www.twilio.com/docs/stun-turn
    // Here's an example in javascript
    pc.onicecandidate =  (evt) => {
      if (evt.candidate) {
        console.log("OnICECandidate: Forwarding ICE candidate to peer.");
        // send the candidate to the other party via your signaling channel
        this.socket.socket.emit("addIceCandidate", {
          candidate: evt.candidate,
          to: _id,
        });
      }
    };
  
    this.addTracksToPeerConnection(this.localMediaStream, pc);
  
    return pc;
  }
  getMedia = async (_mediaConstraints) => {
    let stream = null;
  
    try {
      stream = await navigator.mediaDevices.getUserMedia(_mediaConstraints);
    } catch (err) {
      console.log("Failed to get user media!");
      console.warn(err);
    }
  
    return stream;
  }
  
  addTracksToPeerConnection = (_stream, _pc) => {
    if (_stream == null) {
      console.log("Local User media stream not yet established!");
    } else {
      _stream.getTracks().forEach((track) => {
        _pc.addTrack(track, _stream);
      });
    }
  }
  onPlayerMove =  () => {
    // console.log('Sending movement update to server.');
    this.socket.socket.emit("move", this.glScene.getPlayerPosition());
  }
  
  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // Utilities 🚂
  
  // created <video> element for local mediastream
  createLocalVideoElement = () =>{
    const videoElement = document.createElement("video");
    videoElement.id = "local_video";
    videoElement.autoplay = true;
    videoElement.width = this.videoWidth;
    videoElement.height = this.videoHeight;
    // videoElement.style = "visibility: hidden;";
  
    // there seems to be a weird behavior where a muted video
    // won't autoplay in chrome...  so instead of muting the video, simply make a
    // video only stream for this video element :|
    let videoStream = new MediaStream([this.localMediaStream.getVideoTracks()[0]]);
  
    videoElement.srcObject = videoStream;
    document.body.appendChild(videoElement);
  }
  
  // created <video> element using client ID
  createClientMediaElements = (_id) => {
    console.log("Creating <video> element for client with id: " + _id);
  
    const videoElement = document.createElement("video");
    videoElement.id = _id + "_video";
    videoElement.width = this.videoWidth;
    videoElement.height = this.videoHeight;
    videoElement.autoplay = true;
    // videoElement.muted = true; // TODO Positional Audio
    // videoElement.style = "visibility: hidden;";
  
    document.body.appendChild(videoElement);
  
    // create audio element for client
    let audioEl = document.createElement("audio");
    audioEl.setAttribute("id", _id + "_audio");
    audioEl.controls = "controls";
    audioEl.volume = 1;
    document.body.appendChild(audioEl);
  
    audioEl.addEventListener("loadeddata", () => {
      audioEl.play();
    });
  }
  
  // remove <video> element and corresponding <canvas> using client ID
  removeClientVideoElementAndCanvas = (_id) => {
    console.log("Removing <video> element for client with id: " + _id);
  
    let videoEl = document.getElementById(_id + "_video");
    if (videoEl != null) {
      videoEl.remove();
    }
  }
}


////////////////////////////////////////////////////////////////////////////////
// Clients / WebRTC
////////////////////////////////////////////////////////////////////////////////

// Adds client object with THREE.js object, DOM video object and and an RTC peer connection for each :

// this function sets up a peer connection and corresponding DOM elements for a specific client




// temporarily pause the outgoing stream
/*function disableOutgoingStream() {
  this.localMediaStream.getTracks().forEach((track) => {
    track.enabled = false;
  });
}
// enable the outgoing stream
function enableOutgoingStream() {
  this.localMediaStream.getTracks().forEach((track) => {
    track.enabled = true;
  });
}*/

////////////////////////////////////////////////////////////////////////////////
// Three.js
////////////////////////////////////////////////////////////////////////////////



export default IndexSetup;
