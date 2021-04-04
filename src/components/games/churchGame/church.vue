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
import * as scene from '../churchGame/libs/scene.js'

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
    
    
    render () {
     // this.renderer.render(this.scene, this.camera);
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
      
    }
}
</script>
<style scoped>
  
</style>