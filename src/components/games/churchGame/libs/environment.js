
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



function createEnvironment(scene) {
  console.log("Adding environment");

loadModel(scene);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
//directionalLight.position.set()
scene.add( directionalLight );

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
scene.add(hemiLight);

}




function loadModel(scene){
// model

const onProgress = function ( xhr ) {

  if ( xhr.lengthComputable ) {

    const percentComplete = xhr.loaded / xhr.total * 100;
    console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

  }

};

const onError = function () { };

const manager = new THREE.LoadingManager();


// comment in the following line and import TGALoader if your asset uses TGA textures
// manager.addHandler( /\.tga$/i, new TGALoader() );

new MTLLoader( manager )
  .setPath( '/church/assets/' )
  .load( 'confessional+2.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader( manager )
      .setMaterials( materials )
      .setPath( '/church/assets/' )
      .load( 'confessional+2.obj', function ( object ) {

        object.position.z = .8;
        object.position.x = -3;
        //object.position.z = -3;
        object.scale.set(.015,.02,.015);
        object.rotation.y = Math.PI/2;
        
        scene.add( object );

      }, onProgress, onError );

  } );

  new MTLLoader( manager )
  .setPath( '/church/assets/' )
  .load( 'confessional+2.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader( manager )
      .setMaterials( materials )
      .setPath( '/church/assets/' )
      .load( 'confessional+2.obj', function ( object4 ) {

        object4.position.z = 0;
        object4.position.x = 4;
        //object4.position.y = 1;
        //object.position.z = -3;
        object4.scale.set(.015,.02,.015);
        object4.rotation.y = -Math.PI/2;
        object4.userData.confessional = true;
        
        scene.add( object4 );

      }, onProgress, onError );

  } );


   new GLTFLoader( manager )
  .setPath('https://churchmodel.s3.us-east-2.amazonaws.com/churchmodel/')
  .load ('church.glb', function ( object2 ){
    object2.scene.rotation.y = Math.PI/2;
    //object2.scene.rotation.z = Math.PI/2;
    object2.scene.position.y = 5.6;
    object2.scene.position.x = -4.25;
    object2.scene.scale.set(.25,.25,.25);
      scene.add(object2.scene);
      console.log("church worked",object2);
        }, onProgress, onError);

   new GLTFLoader( manager )
  .setPath('/church/assets/briefcase/')
  .load ('scene.gltf', function ( object3 ){
      object3.scene.scale.set(.04,.04,.04);

      object3.scene.position.y = .65;
      object3.scene.position.z = 8.38;
      object3.scene.position.x = 0;
      object3.scene.rotation.y = Math.PI/4
      
      scene.add(object3.scene);
        }, onProgress, onError);
        

        
  
        
        

//


}

export {
  createEnvironment
} 