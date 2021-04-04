<template>
 <div>
    <div id="container"
    > </div>
    <audio loop id='track1' src='/church/phone/InSceneSalCall.mp3' type='audio/mpeg' preload='auto' style='display: none'></audio>
    <audio loop id='track2' src='/church/phone/InSceneGoomahCall.mp3' type='audio/mpeg' preload='auto' style='display: none'></audio>
    <audio loop id='track3' src='/church/phone/InSceneWifeCall.mp3' type='audio/mpeg' preload='auto' style='display: none'></audio>
 </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PositionalAudioHelper } from 'three/examples/jsm/helpers/PositionalAudioHelper.js';
export default {
  name: 'church',
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null
    }
  },
  methods: {
    init: function() {
       /* const overlay = document.getElementById( 'overlay' );
        overlay.remove(); */
        
        const container = document.getElementById( 'container' )

        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
        this.camera.position.set( 3, 2, 3 ); // our starting view position

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xa0a0a0 ); // background color
        this.scene.fog = new THREE.Fog( 0xa0a0a0, 2, 20 ); // fog is interesting, try commenting it out

        // boiler plate - now we add lights to the scene
        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
        hemiLight.position.set( 0, 20, 0 ); // this will be overhead
        this.scene.add( hemiLight );

        // boiler plate - this light will determined the shadow that we see on our objects
        const dirLight = new THREE.DirectionalLight( 0xffffff );
        dirLight.position.set( 5, 5, 0 );
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 1;
        dirLight.shadow.camera.bottom = - 1;
        dirLight.shadow.camera.left = - 1;
        dirLight.shadow.camera.right = 1;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 20;
        this.scene.add( dirLight );

        
        // this mesh plane is our floor
        const floorGeometry = new THREE.PlaneGeometry( 50, 50 )
        const floorMaterial = new THREE.MeshPhongMaterial( { color: 0xc28f4c, depthWrite: false } )
        const floorMesh = new THREE.Mesh( floorGeometry, floorMaterial );
        floorMesh.rotation.x = - Math.PI / 2;
        floorMesh.receiveShadow = true; // to show the shadow from our objects
        this.scene.add( floorMesh );
        
        // helping us percieve the 3D layout of the space we're creating
        const grid = new THREE.GridHelper( 50, 50, 0x888888, 0x888888 );
        this.scene.add( grid );

        const wallGeometry = new THREE.BoxGeometry( 2, 1, 0.1 );
        const wallMaterial = new THREE.MeshBasicMaterial( { color: 0x35d4a4, transparent: true, opacity: 0.5 } );

        const wall = new THREE.Mesh( wallGeometry, wallMaterial );
        wall.position.set( 0, 0.5, 0 );
        this.scene.add( wall );

        let sphereGeometry = new THREE.SphereGeometry( 0.25, 0, 0 );
        let sphereMaterial = new THREE.MeshPhongMaterial( { color: 0x8f34eb } );
        let sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
        sphere.position.set ( 0, 0.25, 2);
        
        sphere.castShadow = true;
        this.scene.add (sphere);

        let sphere2 = new THREE.Mesh( sphereGeometry, sphereMaterial );
        sphere2.position.set ( 0, 0.25, -2);
        sphere2.rotation.x = Math.PI;
        sphere2.castShadow = true;
        this.scene.add (sphere2);

        //listener
        const listener = new THREE.AudioListener()
        this.camera.add( listener );

        const audioElement1 = document.getElementById( 'track1' )
        audioElement1.play();
        this.camera.add (audioElement1)
        
        //audio play
        const audioElement2 = document.getElementById( 'track2' )
        audioElement2.play();

        //positional audio
        const positionalAudio2 = new THREE.PositionalAudio( listener )
        positionalAudio2.setMediaElementSource ( audioElement2 )
        positionalAudio2.setRefDistance ( 1 );
        positionalAudio2.setDirectionalCone (180, 230, 0.1,);

        const helper2 = new PositionalAudioHelper (positionalAudio2, 2 )
        positionalAudio2.add (helper2)
        sphere.add( positionalAudio2 )

        //audio play
        const audioElement3 = document.getElementById( 'track3' )
        audioElement3.play();

        //positional audio
        const positionalAudio3 = new THREE.PositionalAudio( listener )
        positionalAudio3.setMediaElementSource ( audioElement3 )
        positionalAudio3.setRefDistance ( 1 );
        positionalAudio3.setDirectionalCone (180, 230, 0.1,);

        const helper3 = new PositionalAudioHelper (positionalAudio3, 2 )
        positionalAudio3.add (helper3)
        sphere2.add( positionalAudio3 )



        // boiler plate - setting up rendering from 3D to 2D
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;
        container.appendChild( this.renderer.domElement );


        // boiler plate - setting up the basic controls for navigation
        const controls = new OrbitControls( this.camera, this.renderer.domElement );
        controls.target.set( 0, 0.1, 0 );
        controls.update();
        controls.minDistance = 0.5;
        controls.maxDistance = 10;
        controls.maxPolarAngle = 0.5 * Math.PI;

        this.renderer.setAnimationLoop(() => {
       
          this.render();
        })
    },
    render () {
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
      this.init();
  },
  computed: {
        dimensions() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
          case 'sm':
            return {   height: '800px',
                      width: '350px' };
          case 'md':
            return {   height: '1000px',
                      width: '800px' };
          default:
            return {   height: '900px',
                      width: '1600px' };
        }
      },
      scale() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
          case 'sm':
            return {
              flowersize: 0.2,
              petalSize: 0.9,
              arrangementRadius: 0.5
            };
          case 'md':
            return {
              flowersize: 0.2,
              petalSize: 0.9,
              arrangementRadius: 1
            }; 
          default:
            return {
              flowersize: 0.2,
              petalSize: 0.9,
              arrangementRadius: 1
            };
        }
      }
    }
}
</script>
<style scoped>
  
</style>