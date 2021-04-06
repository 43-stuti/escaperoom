<template>
  <div>
    <v-container fluid class="HomeHero" fill-width fill-height
      v-bind:style ="heroHeight"
    >
        <v-container align="center">
          <v-container>
            <v-row align="center"> 
              <v-col class = "Welcome mb-2" align = "center"
                    :cols = 12
                    :lg = 12
                    :sm = 12
                    :md = 12>
                <div>
                  <v-row  v-bind:class="[Classes.logo]" align='center'>
                    Sal's
                  </v-row>
                  <v-row  v-bind:class="[Classes.CoverText]" align='center'>
                    PIZZA SHOP
                  </v-row>
                  <v-row v-bind:class="[Classes.SubText] " align='center'> 
                    TAKEOUT AND DELIVERY
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      Classes : {
        logo:  'text-h6 font-weight-black justify-center',
        CoverText : 'text-h4 text-sm-h4 text-md-h2 text-lg-h1 text-xl-h1 font-weight-black justify-center',
        CoverTextLight : 'text-h4 text-sm-h4 text-md-h4 text-lg-h4 text-xl-h1 font-weight-regular text-left green--text text--darken-2 mt-12',
        SubText : 'mt-4 text-body-1 font-weight-medium justify-center'
      },
      socket:null
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
      }
    },
     mounted() {
    }
}
</script>

<style>

  
  .HomeHero {
    height: 100%;
    width: 100%;
    z-index: -1;
    background-color:  rgba(70, 156, 0, 0.7);
  }
  .Flowers {
       z-index: 0;
       position: absolute;
       margin-top: -100px;
  }
  .Welcome {
       z-index: 1;
  }
</style>