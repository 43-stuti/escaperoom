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
    <v-container class="Work" fluid fill-width>
        <v-container class="my-12 ">
        <v-row>
            <v-col
            :cols = 5>
                <v-img src="/dough.jpg" aspect-ratio="1.5"></v-img>
            </v-col>
            <v-col
            :cols = 12
            :xl = 5
            :lg = 5
            :md = 5
            :sm = 12
            >
                <v-container>
                    <v-row class="font-weight-bold green--text text--darken-2">
                        Our Style
                    </v-row>
                    <v-row  class="text-body-2 font-weight-regular mt-12 white--text">
                      To serve you the best, we carefully handpick all our ingredients. 
                    </v-row>
                     <v-row  class="text-body-2 font-weight-thin mt-12 white--text">
                       From cheese, vegetables or sausages. We make sure the best reaches your plate. We have built a beautiful community of people who are always there to ensure that you have an unforgettable experience once at Sal's .
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
        </v-container>
    </v-container>
    <v-container fluid fill-width fill-height>
      <Testimonials></Testimonials>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

import Testimonials from '../components/homepage/testimonials.vue'
export default {
  name: 'Home',
  components: {
    Testimonials
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
            return {height: '100vh'};
          default:
            return {height: '100vh'};
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
    background-image:  url('/pizza.jpg');
    background-size: cover;
    color: rgb(255, 255, 255);
  }
  .Flowers {
       z-index: 0;
       position: absolute;
       margin-top: -100px;
  }
  .Welcome {
       z-index: 1;
  }
  .Work {
        background-color: rgb(34, 33, 33);
    }
</style>