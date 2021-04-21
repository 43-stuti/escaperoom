<template>
 <div>
    <div id="canvas-container"
    > </div>
    <audio loop id='track1' src='/church/assets/confession/Father.mp3' type='audio/mpeg' preload='auto' style='display: none'></audio>
    <audio loop id='track2' src='/church/assets/confession/Sal.mp3' type='audio/mpeg' preload='auto' style='display: none'></audio>
    <audio loop id='track3' src='/church/assets/confession/Big-Tony.mp3' type='audio/mpeg' preload='auto' style='display: none'></audio>
    
    <div id="popUpBox">
      <iframe src="https://editor.p5js.org/zsk236/embed/FV0X25LzC" width=800px height=400px></iframe>
      
      <button id='button'>CLOSE</button>
      
	<div id="wait">
	
	</div>
<div id="box">
	

<div id="closeModal" ></div>
  </div>
  </div>
</div>
</template>
<script>

import Scene from '../churchGame/libs/scene.js'
import IndexSetup from '../churchGame/libs/index1.js'
export default {
  name: 'church',
  data() {
    return {
      Classes : {
        logo:  'text-h6 font-weight-black justify-center',
        CoverText : 'text-h4 text-sm-h4 text-md-h2 text-lg-h1 text-xl-h1 font-weight-black justify-center',
        CoverTextLight : 'text-h4 text-sm-h4 text-md-h4 text-lg-h4 text-xl-h1 font-weight-regular text-left green--text text--darken-2 mt-12',
        SubText : 'mt-4 text-body-1 font-weight-medium justify-center'
      },
      glScene:null,
      index:null
    }
  },
  computed: {
    heroHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return {height: '550px'};
        default:
          return {height: '650px'};
      }
    },
    socket() {
     return this.$store.state.socket;
    }, 
    clientCount() {
     return this.$store.state.clientCount;
    }
  },
  watch :{
    clientCount(){
      this.index.addClient(this.$store.state.lastAddedClient);
    }
  },
  methods: {
    render () {
     // this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.glScene = new Scene(this.socket);
    this.index = new IndexSetup(this.socket,this.glScene);
    for(let id in this.socket.clients) {
      if(id != this.socket.id) {
        this.index.addClient(id);
      }
    }
    this.glScene.update();
  }
}
</script>
<style scoped>
  #container {
    background-color: black;
    height: 10px;
    width: 20px;
  }
  #popUpBox {
			width: 1000px;
			overflow: hidden;
			background: white;
			box-shadow: 0 0 10px black;
			border-radius: 10px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 9999;
			padding: 10px;
			text-align: center;
			display: none;

		}
		#wait{
			display:block;
		}
</style>