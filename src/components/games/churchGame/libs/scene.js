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
import * as yorbControls from './yorbControls.js';
import * as environment from './environment.js';
import * as THREE from 'three';


import Alert from './modalControl.js';
//import { render } from 'sass';

class Scene {
  

  constructor(socket) {
    console.log('HAHAHHA',socket)
    //this.movementCallback = _movementCallback;
    this.socket = socket;
    //THREE scene
    this.scene = new THREE.Scene();
    this.keyState = {};

    //Utility
    this.width = window.innerWidth;
    this.height = window.innerHeight - 100;

    //Add Player
    this.addSelf();

    //THREE Camera
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.width / this.height,
      0.1,
      5000
    );
    //this.camera.position.set(0, 0, 6);
    this.scene.add(this.camera);

    

    // create an AudioListener and add it to the camera
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
    

        let sphereGeometry = new THREE.SphereGeometry( 0.25, 0, 0 );
        let sphereMaterial = new THREE.MeshPhongMaterial( { transparent:true,opacity:0 } );
  
    
        //sphere1
        
        this.sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
        this.sphere.position.set ( 0, 1, 0);
        this.sphere.castShadow = true;
        this.scene.add (this.sphere);
        //audio
        this.audioElement1 = document.getElementById( 'track1' )
        //positional audio
        this.positionalAudio1 = new THREE.PositionalAudio( this.listener )
        this.positionalAudio1.setMediaElementSource ( this.audioElement1 )
        this.positionalAudio1.setRefDistance ( 1 );
        this.positionalAudio1.setDirectionalCone (110, 180, 0.1,);
        this.sphere.add( this.positionalAudio );

        //sphere2
        
        this.sphere2 = new THREE.Mesh( sphereGeometry, sphereMaterial );
        this.sphere2.position.set ( 4.5, 1, 2);
        this.sphere2.castShadow = true;
        
        //audio 
        
        this.audioElement2 = document.getElementById( 'track2' );
        //positional audio
        this.positionalAudio2 = new THREE.PositionalAudio( this.listener );
        this.positionalAudio2.setMediaElementSource ( this.audioElement2 );
        this.positionalAudio2.setRefDistance ( .1);
        this.positionalAudio2.setDirectionalCone (110, 180, .1);
        this.sphere2.add( this.positionalAudio2 );
        this.scene.add (this.sphere2);
        //sphere 3
        
        this.sphere3 = new THREE.Mesh( sphereGeometry, sphereMaterial );
        this.sphere3.position.set ( -3, 1, -.8);
        //this.sphere3.rotation.x = Math.PI;
        this.sphere3.rotation.y = Math.PI/2;
        this.sphere3.castShadow = true;
        
        //audio play
        this.audioElement3 = document.getElementById( 'track3' );
        //positional audio
        this.positionalAudio3 = new THREE.PositionalAudio( this.listener );
        this.positionalAudio3.setMediaElementSource ( this.audioElement3 );
        this.positionalAudio3.setRefDistance ( .2 );
        this.positionalAudio3.setDirectionalCone (40, 50, .1);
        
        this.sphere3.add( this.positionalAudio3 );
        this.scene.add (this.sphere3);

        

    //THREE WebGL renderer
    this.renderer = new THREE.WebGLRenderer({
      antialiasing: true,
    });
    this.renderer.setClearColor(new THREE.Color("lightblue"));
    this.renderer.setSize(this.width, this.height);

    //Push the canvas to the DOM
    let domElement = document.getElementById("canvas-container");
    domElement.append(this.renderer.domElement);

    //Setup event listeners for events and handle the states
    window.addEventListener("resize", (e) => this.onWindowResize(e), false);
    window.addEventListener("keydown", (e) => this.onKeyDown(e), false);
    window.addEventListener("keyup", (e) => this.onKeyUp(e), false);

    // Helpers
    this.scene.add(new THREE.GridHelper(500, 500));
    this.scene.add(new THREE.AxesHelper(10));

    this.addLights();
    environment.createEnvironment(this.scene);

     // set up the raycaster:
     this.setUpRaycaster();

    // Start the loop
    this.frameCount = 0;

    // Add Controls for the scene
    // Option 1: our third person player controls:
    // this.controls = new THREE.PlayerControls(this.camera, this.playerGroup);

    // Option 2: using map controls:
  /*this.controls = new THREE.MapControls(
      this.camera,
      this.renderer.domElement
    );

    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.05;

    this.controls.screenSpacePanning = false;

    this.controls.minDistance = 10;
    this.controls.maxDistance = 500;

    this.controls.maxPolarAngle = Math.PI / 2;*/

    
    this.controls = new yorbControls.yorbControls(this.scene,this.camera, this.renderer);

    // Start the update loop
    //this.update();
  }

  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // Lighting 💡

  addLights() {
    this.scene.add(new THREE.AmbientLight(0xffffe6, 0.7));
  }

  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // this.socket.clients 👫

  addSelf() {
    //let videoMaterial = makeVideoMaterial("local");
    //let bodyMaterial = new THREE.MeshBasicMaterial({transparent: true, opacity:0});
    let headMaterial = new THREE.MeshBasicMaterial({transparent: true, opacity: 0});
    

    let _head = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), headMaterial);
    //let _body = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), bodyMaterial);

    //_body.userData.interactable = true;
    //_head.userData.interactable = true;
    _head.position.set(0, 0, 0);
    //_body.position.set(0,.5,0);

    // https://threejs.org/docs/index.html#api/en/objects/Group
    this.playerGroup = new THREE.Group();
    this.playerGroup.position.set(0, .5, 0);
    this.playerGroup.add(_head);
    //this.playerGroup.add(_body);

    // add group to scene
    this.scene.add(this.playerGroup);

    
  }

  // add a client meshes, a video element and  canvas for three.js video texture
  addClient(_id) {
    let videoMaterial = makeVideoMaterial(_id);
    //let bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x000000});

    let _head = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), videoMaterial);
    //let _body = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), bodyMaterial);

    // set position of head before adding to parent object

    _head.position.set(0, 0, 0);
    //_body.position.set(0,1,0);

    // https://threejs.org/docs/index.html#api/en/objects/Group
    var group = new THREE.Group();
    group.position.set(0,.5,0);
    group.add(_head);
    //group.add(_body);

    // add group to scene
    this.scene.add(group);
    console.log('ADDED GROUP TO BODY')
    this.socket.clients[_id].group = group;
    this.socket.clients[_id].head = _head;
    this.socket.clients[_id].desiredPosition = new THREE.Vector3();
    this.socket.clients[_id].desiredRotation = new THREE.Quaternion();
    this.socket.clients[_id].movementAlpha = 0;
  }

  removeClient(_id) {
    this.scene.remove(this.socket.clients[_id].group);
    console.log(_id);
  }

  // overloaded function can deal with new info or not
  updateClientPositions(_clientProps) {
    for (let _id in _clientProps) {
      // we'll update ourselves separately to avoid lag...
      if (_id != this.socket.id) {
        //update store?
        console.log(this.socket.clients,_id)
        this.socket.clients[_id].desiredPosition = new THREE.Vector3().fromArray(
          _clientProps[_id].position
        );
        this.socket.clients[_id].desiredRotation = new THREE.Quaternion().fromArray(
          _clientProps[_id].rotation
        );
      }
    }
  }

  // snap to position and rotation if we get close
  interpolatePositions() {
    let snapDistance = 0.5;
    let snapAngle = 0.2; // radians
    for (let _id in this.socket.clients) {
      if(this.socket.clients[_id] && this.socket.clients[_id].group) {
        console.log('interpolatePositions',this.socket.clients,_id)
          this.socket.clients[_id].group.position.lerp(this.socket.clients[_id].desiredPosition, 0.2);
          this.socket.clients[_id].group.quaternion.slerp(this.socket.clients[_id].desiredRotation, 0.2);
          if (
            this.socket.clients[_id].group.position.distanceTo(this.socket.clients[_id].desiredPosition) <
            snapDistance
          ) {
            this.socket.clients[_id].group.position.set(
              this.socket.clients[_id].desiredPosition.x,
              this.socket.clients[_id].desiredPosition.y,
              this.socket.clients[_id].desiredPosition.z
            );
          }
          if (
            this.socket.clients[_id].group.quaternion.angleTo(this.socket.clients[_id].desiredRotation) <
            snapAngle
          ) {
            this.socket.clients[_id].group.quaternion.set(
              this.socket.clients[_id].desiredRotation.x,
              this.socket.clients[_id].desiredRotation.y,
              this.socket.clients[_id].desiredRotation.z,
              this.socket.clients[_id].desiredRotation.w
            );
          }
        }
    }
  }

  updateClientVolumes() {
    for (let _id in this.socket.clients) {
      let audioEl = document.getElementById(_id + "_audio");
      if (audioEl) {
        let distSquared = this.camera.position.distanceToSquared(
          this.socket.clients[_id].group.position
        );

        if (distSquared > 500) {
          // console.log('setting vol to 0')
          audioEl.volume = 0;
        } else {
          // from lucasio here: https://discourse.threejs.org/t/positionalaudio-setmediastreamsource-with-webrtc-question-not-hearing-any-sound/14301/29
          let volume = Math.min(1, 10 / distSquared);
          audioEl.volume = volume;
          // console.log('setting vol to',volume)
        }
      }
    }
  }

  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // Interaction 🤾‍♀️

  getPlayerPosition() {
    // TODO: use quaternion or are euler angles fine here?
    return [
      [
        this.playerGroup.position.x = this.camera.position.x,
        this.playerGroup.position.y  ,
        this.playerGroup.position.z = this.camera.position.z,
      ],
      [
        this.playerGroup.quaternion._x ,
        this.playerGroup.quaternion._y ,
        this.playerGroup.quaternion._z ,
        this.playerGroup.quaternion._w ,
      ],
    ];

    //console.log("updating position");
  }

  setUpRaycaster() {
    window.addEventListener("mousemove", (e) => this.onMouseMove(e), false);
    window.addEventListener("mouseup", (e) => this.onMouseUp(e), false);
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.previousIntersects = [];
  }

  checkRaycaster() {
    // clear the transformations from before
    this.activeLink = false;
    this.activeSpawnPoint = false;
    this.activeSpawnNormal = false;
    for (let i = 0; i < this.previousIntersects.length; i++) {
      let obj = this.previousIntersects[i];
      obj.scale.set(1, 1, 1);
    }

    // update the ray with the current camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // calculate objects intersecting the ray
    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );

    for (let i = 0; i < intersects.length && i < 1; i++) {
      let obj = intersects[i].object;

      // test our raycaster by logging the object the ray has intersected with to the console:
       console.log(obj);

      // first, let's check if we have marked the intersected object as interactable!
      // 'continue' means that the subsequent code won't run for this iteraction of the for loop
      if (obj.name == "Team3_Sanchez_Briefcase_Team3_Sanchez_BriefcaseLeather_0")

      {
      console.log("briefcase works");
      this.ModalControl = new Alert();
      this.ModalControl.CustomAlert();
    }

    
    if (obj.name == "Mesh2 confessional_booth_2_1 Model")

    {
    this.audioElement1.play();
    this.audioElement2.play();
    this.audioElement3.play();
      
    
    
  }
      
      

      
      // if we've  added a 'link' to the objects user data, set that to our active link
      /*if (obj.parent.userData.link) {
        this.activeLink = obj.parent.userData.link;
      }*/

      // if we want to spawn something on the surface of another object, we can store the
      // intersection point and the 'normal' (i.e. the angle of the surface) here:
      if (obj.userData.isSpawnSurface) {
        this.activeSpawnPoint = intersects[i].point;
        this.activeSpawnNormal = intersects[i].face.normal;
      }

      // finally, if we'd like to reset object parameters after we're  done interacting,
      // let's store which object we have interacted with:
      this.previousIntersects.push(obj);
    }
  }
  

  onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    this.mouse.x =
      (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    this.mouse.y =
      -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
     //console.log(this.mouse);
  }

  onMouseUp() {
    
    
    //console.log("click");
    this.checkRaycaster();
    console.log(this.mouse);

    

    
  }


  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // Rendering 🎥

  update() {
    requestAnimationFrame(() => this.update());
    this.frameCount++;

    

    

    if (this.frameCount % 25 === 0) {
      this.updateClientVolumes();
      this.socket.socket.emit("move", this.getPlayerPosition());
      //this.movementCallback();
    }

    this.interpolatePositions();
    this.controls.update();
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // Event Handlers 🍽

  onWindowResize(e) {
    console.log(e);
    this.width = window.innerWidth;
    this.height = Math.floor(window.innerHeight - window.innerHeight * 0.3);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  // keystate functions from playercontrols
  onKeyDown(event) {
    event = event || window.event;
    this.keyState[event.keyCode || event.which] = true;
  }

  onKeyUp(event) {
    event = event || window.event;
    this.keyState[event.keyCode || event.which] = false;
  }

  
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// Utilities

function makeVideoMaterial(_id) {
  let videoElement = document.getElementById(_id + "_video");
  let videoTexture = new THREE.VideoTexture(videoElement);

  let videoMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture,
    overdraw: true,
    side: THREE.DoubleSide,
  });

  return videoMaterial;
}

export default Scene;
  
