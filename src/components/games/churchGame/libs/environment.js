
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



function createEnvironment(scene) {
  console.log("Adding environment");

loadModel(scene);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add( directionalLight );

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
  .setPath( '../assets/' )
  .load( 'confessional+2.mtl', function ( materials ) {

    materials.preload();

    new OBJLoader( manager )
      .setMaterials( materials )
      .setPath( '../assets/' )
      .load( 'confessional+2.obj', function ( object ) {

        object.position.z = .8;
        object.position.x = -.7;
        //object.position.z = -3;
        object.scale.set(.025,.03,.03);
        object.rotation.y = Math.PI/2;
        
        scene.add( object );

      }, onProgress, onError );

  } );

  /*const loader = new GLTFLoader( manager )
  .setPath('./assets/church/')
  .load ('scene.gltf', function ( object2 ){

      //object2.scene.scale.set(.5,.5,.5);
      scene.add(object2.scene);
        }, onProgress, onError);
        

        
  
        
        

//

*/
}

exports.createEnvironment = createEnvironment ;
