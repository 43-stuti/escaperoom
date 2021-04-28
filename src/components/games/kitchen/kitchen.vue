<template>
  <div>
    <v-container class="kitchenMain"
    >
      <v-row v-if="!absolute">
         <v-col class = "mb-2" align = "center"
                    :cols = 8
                    :lg = 8
                    :sm = 12
                    :md = 12>
          <div v-if="currentColour" id="lens" v-bind:style="{backgroundColor:currentColour}">
          </div>
          <v-container>
            <v-row justify = "center">
              <v-col
               :cols = 1
                v-for="colours in colourList"
                :key="colours.colour"
                class="colourPicker"
                v-bind:style="{backgroundColor:colours.hex}"
                :id="colours.id"
                @click="onClick($event)"
              >
              </v-col>
            </v-row>
            <v-row align="center" class="mt-12"> 
              <v-col 
                :cols = 4
              >
                <div>
                    <v-row>
                      <v-col
                      :cols = 3
                      v-for="(item,index) in rawItems"
                      :key="index"
                      class="rawItem"
                      v-bind:style="checkHover(item.id) ? { 'color': item.hex,'opacity':1 } : {'opacity':0 }"
                      @mouseover="mouseOver($event)"
                      @click="addToBowlSock($event)"
                      >
                      <div v-if="index< 9" :id="index+1">
                        {{item.text}}
                      </div>
                      </v-col>
                    </v-row>
                </div>
              </v-col>
              <v-col 
                :cols = 4
                 v-bind:style="{color:'#FFFFFF'}"
              >
                <div class="mixer px-3" >
                  <v-row justify = "center" class="mt-3">
                   <h4> MIXING BOWL </h4>
                  </v-row>
                  <div class="mt-12">
                    <v-row>
                      <v-col
                        :cols = 3
                        v-for="(item,index) in inBowl"
                        :key="index"
                        :id="index+1"
                        class="rawItem1"
                        @click="removeFromBowlSock(index)"
                        >
                        {{item.text}}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-img id="bowl" src="/kitchen/bowl.png" contain aspect-ratio="1.9"/>
                    </v-row>
                    <v-row  class="mt-0" v-if="currentIngredient">
                      {{currentIngredient.message}}
                    </v-row>
                  </div>
                </div>
              </v-col>
              <v-col 
                :cols = 4
              >
                <div>
                    <v-row>
                      <v-col
                      :cols = 3
                      v-for="(item,index) in rawItems"
                      :key="index"
                      class="rawItem"
                      v-bind:style="checkHover(item.id) ? { 'color': item.hex,'opacity':1 } : {'opacity':0 }"
                      @mouseover="mouseOver($event)"
                      @click="addToBowlSock($event)"
                      >
                      <div v-if="index>= 9" :id="index+1">
                        {{item.text}}
                      </div>
                      </v-col>
                    </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
        
          </v-col>
          <v-col class="pizza"
                    :cols = 3
                    :lg = 3
                    :sm = 12
                    :md = 12>
                    <pizza :pizzaState="pizzaState"></pizza>
          </v-col>
      </v-row>
    </v-container>
    <v-overlay class="overlay1"
            :absolute="absolute"
            :opacity = 1
            :value="overlay"
          >
          <h1>ESCAPED!!</h1>
     </v-overlay>
  </div>
</template>

<script>
// @ is an alias to /src
import pizza from './svg/pizza.vue'

export default {
  name: 'kitchen',
  components: {
    pizza
  },
  data() {
    return {
      Classes : {
        logo:  'text-h6 font-weight-black justify-center',
        CoverText : 'text-h4 text-sm-h4 text-md-h2 text-lg-h1 text-xl-h1 font-weight-black justify-center',
        CoverTextLight : 'text-h4 text-sm-h4 text-md-h4 text-lg-h4 text-xl-h1 font-weight-regular text-left green--text text--darken-2 mt-12',
        SubText : 'mt-4 text-body-1 font-weight-medium justify-center'
      },
      colourList: [
        {
          id:1,
          colour:'blue',
          hex:'#80A9F8'
        },
         {
          id:2,
          colour:'red',
          hex:'#EC6F6F'
        },
         {
          id:3,
          colour:'green',
          hex:'#7FC873'
        },
         {
          id:4,
          colour:'yellow',
          hex:'#FDE079'
        }
      ],
       rawItems:[
        {
          id:1,
          text:'milk',
          colour:4,
          hex:'#FDE079'
        },
        {
          id:2
        },
        {
          id:3,
          text:'tomato',
          hex:'#EC6F6F'
        },
        {
          id:4,
          text:'water',
          colour:3,
          hex:'#80A9F8'
        },
        {
          id:5,
          text:'bone dust',
          hex:'#7FC873'
        },
        {
          id:6,
          text:'garlic',
          hex:'#FDE079'
        },
        {
          id:7,
        },
        {
          id:8,
          text:'blood',
          hex:'#EC6F6F'
        },
        {
          id:9,
          text:'butter',
          hex:'#FDE079'
        },
         {
          id:10
        },
        {
          id:11,
           text:'lemon',
          hex:'#FDE079'
        },
        {
          id:12,
          text:'salt',
          hex:'#FDE079'
        },
        {
          id:13,
          text:'flour',
          hex:'#FDE079'
        },
        {
          id:14,
          text:'peanut',
          hex:'#7FC873'
        },
        {
          id:15
        },
        {
          id:16,
          text:'flesh',
          hex:'#80A9F8'
        },
        {
          id:17,
          text:'cumin',
          hex:'#EC6F6F'
        },
        {
          id:18,
          text:'oil',
          hex:'#80A9F8'
        },
        {
          id:19,
          text:'hair',
          hex:'#EC6F6F'
        },
        {
          id:20
        }
      ],
      ingredients: [
        {
          items:['milk','salt','lemon'],
          ingredient:'Cheese',
          message:'You found the special cheese for the pizza'
        },
        {
          items:['blood','tomato','garlic'],
          ingredient:'Sauce',
          message:'You found the special secret Sauce for the pizza!'
        },
        {
          items:['bone dust','flour','water'],
          ingredient:'Dough',
          message:'You found the special cheese for the pizza'
        },
        {
          items:['flesh','oil'],
          ingredient:'Pepperoni',
          message:'You found the special cheese for the pizza'
        }
      ],
      currentColour:null,
      currentHovered: [],
      inBowl: [],
      formedIngredients: [],
      currentIngredient:null,
      pizzaState:null,
      overlay:false
    }
  },
  methods: {
    onClick: function(event) {
      console.log('event',event.target.id);
      if(event.target.id && this.colourList[event.target.id-1]) {
        let picked = this.colourList[event.target.id-1];
        this.currentColour = picked.hex;
      }
    },
    mouseOver: function(event) {
      if(event.target.id && this.rawItems[event.target.id-1] && this.currentColour && this.rawItems[event.target.id-1].hex == this.currentColour) {
        //console.log('EVENT',event.target,this.currentColour,this.rawItems[event.target.id-1]);
        this.currentHovered.push(parseInt(event.target.id));
      }
    },
    onMouseMove(event) {
      if(this.currentColour) {
          let obj = document.getElementById('lens');
          if(obj) {
              obj.style.left = event.pageX-100 + 'px';
              obj.style.top = event.pageY - 100 + 'px';
          }
      } 
    },
    checkHover(id) {
      if(this.currentHovered.indexOf(id) > -1) {
        return 1;
      } else {
        return 0;
      }
    },
    addToBowlSock(event) {
      console.log('eventevent',event.target.id)
      var x = event.target.id;
      this.socket.socket.emit('bowl-update',{
        id:x
      });
    },
    addToBowl(event) {
      if(event.id && this.rawItems[event.id-1]) {
        let obj = this.rawItems[event.id-1];
        var itemNames = Array.from(Object.values(this.inBowl), item => item.text);
        if(itemNames.indexOf(obj.text) == -1) {
          this.inBowl.push(obj);
          if(this.currentIngredient) {
            this.currentIngredient = null;
          }
          let index = this.checkIngredient();
          if(index) {
            this.inBowl = [];
            this.formedIngredients.push(this.ingredients[index-1]);
            this.ingredients.splice(index-1,1);
            this.currentIngredient = this.formedIngredients[this.formedIngredients.length-1];
            this.pizzaState = index;
            if(this.formedIngredients.length == 4) {
              console.log('GAME OVER');
              this.overlay = true;
            }
            console.log('this.currentIngredient',this.currentIngredient)
          }
        }
      }
    },
    removeFromBowlSock(id) {
      this.socket.socket.emit('bowl-remove',id);
    },
    removeFromBowl(id) {
      this.inBowl.splice(id,1)
    },
    checkIngredient() {
      var itemNames = Array.from(Object.values(this.inBowl), item => item.text);
      for(let i=0;i<this.ingredients.length;i++) {
        if(this.isEqual(this.ingredients[i].items,itemNames)) {
          return(i+1);
        }
      }
      return 0
    },
    isEqual(arr1,arr2) {
      if(arr1.length != arr2.length) {
        return 0
      } 
      for (let i=0;i<arr1.length;i++) {
        if(!arr2.includes(arr1[i])){
          return 0;
        }
      }
      return 1;
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
      },
      socket() {
            return this.$store.state.socket;
        }
  },
  mounted() {
      document.addEventListener('mousemove', this.onMouseMove);
      this.socket.socket.on('bowl-update-socket',(data) => {
            this.addToBowl(data);
        })
      this.socket.socket.on('bowl-remove-socket',(data) => {
          this.removeFromBowl(data);
      })
  }
}
</script>

<style>
  @font-face {
        font-family: 'Gloria Hallelujah';
        src: url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');
        font-weight: normal;
        font-style: normal;
    }
  .kitchenMain {
    background-color: rgb(22, 22, 22);
  }
  .KitchenHero {
    height: 100%;
    width: 100%;
    z-index: -1;
    color: rgb(0, 0, 0);
  }
  .Flowers {
       z-index: 0;
       position: absolute;
       margin-top: -100px;
  }
  .mixer {
    height: 250px;
    width: 250px;
    border: rgb(255, 255, 255);
    border-style: dashed;
  }
  .colourPicker {
    height:60px;
    z-index: 50;
    width: 2px;
    border-radius: 50%;
    margin-right: 10px;
    margin-top: 100px;
  }
  #lens {
      position: absolute;
      z-index: 20;
      width: 150px; 
      height: 150px;
      border-radius: 50%;
      opacity:30%
  }
  .rawItem {
    z-index: 30;
    margin-bottom: 30px;
    font-weight: 600;
  }
  .rawItem1 {
    z-index: 30;
    margin-bottom: -50px;
  }
  .pizza {
    background-color: '#FDF9F0' !important;
    color: darkblue;
  }
  #bowl {
  }
  .overlay1 {
    z-index: 100;
  }
</style>