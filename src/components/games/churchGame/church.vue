<template>
 <div>
    <div id="canvas-container"
    > </div>
    <audio loop id='track1' src='/church/assets/phone/InSceneSalCall.mp3' type='audio/mpeg' preload='auto' style='display: none'></audio>
    <audio loop id='track2' src='/church/assets/phone/InSceneGoomahCall.mp3' type='audio/mpeg' preload='auto' style='display: none'></audio>
    <audio loop id='track3' src='/church/assets/phone/InSceneWifeCall.mp3' type='audio/mpeg' preload='auto' style='display: none'></audio>
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
    clientCount(val){
      console.log('WAAAH',val);
      //add client
      this.index.addClient(this.$store.state.lastAddedClient);
    }
  },
  methods: {
    render () {
     // this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    console.log('SCENEE',this.socket)
    this.glScene = new Scene(this.socket);
    this.index = new IndexSetup(this.socket,this.glScene);
    console.log('BRRROOOOO',this.socket.clients)
    for(let id in this.socket.clients) {
      if(id != this.socket.id) {
        console.log('MOUNTEDDD',id)
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
</style>