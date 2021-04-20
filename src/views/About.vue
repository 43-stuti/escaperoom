 <template>
  <div>
    <v-container fluid fill-width fill-height
      v-bind:style ="heroHeight"
    >
      <pose></pose>
    </v-container>
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
                    Hi
                  </v-row>
                  <v-row  v-bind:class="[Classes.CoverText]" align='center'>
                    Sal
                  </v-row>
                  <v-row v-bind:class="[Classes.SubText] " align='center'> 
                    TAKEOUT AND DELIVERY
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-container class="mt-4 pa-6">
            <v-row>
              Sal’s Pizza is a story of the American dream. After immigrating from Italy in the 1960s, Sal and his family have dedicated themselves to serving the finest pizza in the neighborhood. Despite having pennies to their name, the hard work of Sal’s family quickly established Sal’s Pizza as a proud cornerstone for a small, close-knit Italian community. Our mission is for each slice to be a celebration of our family’s heritage and roots. Our menu highlights the best of the Italian-American experience, combining our centuries-old secret family recipe with modern American toppings. 
            </v-row>
            <v-row>
              Sal’s Pizza is also a story of resilience. In 1972, tragedy struck Sal’s Pizza after the restaurant was set ablaze. The beloved family and community patriarch, Sal, went missing, leaving behind his beloved wife and children. Despite their losses, Sal’s family continued to run and grow the business, preserving Sal’s legacy for generations. Sal’s Pizza is survived by his two children.
dialogue stuff i'll work on from scene to scene
            </v-row>
          </v-container>
        </v-container>
  </div>
</template>

<script>
import pose from '../components/games/pose/pose.vue'
  export default {
    name:'About',
    data() {
      return {
        Classes : {
          logo:  'text-h6 font-weight-black justify-center',
          CoverText : 'text-h4 text-sm-h4 text-md-h2 text-lg-h1 text-xl-h1 font-weight-black justify-center',
          CoverTextLight : 'text-h4 text-sm-h4 text-md-h4 text-lg-h4 text-xl-h1 font-weight-regular text-left green--text text--darken-2 mt-12',
          SubText : 'mt-4 text-body-1 font-weight-medium justify-center'
        }
      }
    },
    components: {
      pose
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
    }
  }
</script>
<style scoped>

</style>