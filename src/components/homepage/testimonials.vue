<template>
    <v-container fluid fill-width class="Testimonial" justify = 'center' align='center'>
      <v-container class="my-12">
        <v-container>
          <v-row  v-bind:class="[Classes.SectionHeading]">
              Testimonials
          </v-row>
          <v-row v-if = "clientComments.length" v-bind:class="[Classes.SectionSubHeading]" class="mb-8">
             What our customers have to say
          </v-row>
        </v-container>
        <v-row align="start">
          <v-carousel 
            v-bind:style ="containerHeight"
            hide-delimiter-background
            hide-delimiters
            show-arrows-on-hover
          >
              <v-carousel-item class =  "cara mt-2"
                  
                  v-for = "(item, i) in clientComments"
                  :item = "item"
                  :key="i"
              >
                <TestimonialCard :item="item" 
                            :key="i"></TestimonialCard>
    
              </v-carousel-item>
          </v-carousel>
         
        </v-row>
      </v-container>
    </v-container>
</template>  
<script>
import TestimonialCard from './testimonialcard.vue';
  export default {
    name: 'Testimonials',
    components : {
      TestimonialCard
    },
    data() {
      return{
         Classes: {
                SectionHeading : 'green--text text--darken-2 font-weight-medium mb-1',
                SectionSubHeading : 'text-h5 font-weight-light mt-2'
            },
        clientComments: [
          {
            Comment: 'One of the most authentic Italian restuarants I have been to in the whole city. This is where my Mom went to taste the best from Italy and I follow the tradition. What a lovely job the Russo family has done with mainiting the authenticity of the recipe.',
            Name:'Laura'
          },
          {
            Comment: '',
            Name:'Giovanni'
          },
          {
            Comment: '',
            Name:'Valentina'
          },
          {
            Comment: '',
            Name:'Luca'
          }
        ]
      }
    },
    computed: {
      containerHeight() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
          case 'sm':
            return {height : '550px'};
          default:
            return {height : '300px'};
        }
      },
      horizontalPosition() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
          case 'sm':
            return 'center';
          default:
            return 'left';
        }
      }
    },
    methods: {
    },
    created() {
    }
  }
</script>
<style scoped>
 .Testimonial {
   background: #FAFAFA;
   width: 100%
 }
</style>